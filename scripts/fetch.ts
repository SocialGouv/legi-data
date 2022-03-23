import * as fs from "fs";
import pPipe from "p-pipe";
import PQueue from "p-queue";
import retry from "p-retry";
import * as path from "path";
import { Logger } from "tslog";
import { promisify } from "util";

import getDirname from "../src/helpers/getDirname";
import type { LegiData } from "../src/types";
import { getArticle, getTableMatieres } from "./libs/api";
import { latestArticleVersionFilter, toArticle, toCodeOrSection } from "./libs/transform";
import type { TocApiResult, TocSection } from "./types";

const log = new Logger();

const CODES_TO_FETCH: string[] = [
  "LEGITEXT000006072050",
  "LEGITEXT000022197698",
  "LEGITEXT000031366350",
  "LEGITEXT000006073189",
];
const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

if (OAUTH_CLIENT_ID === undefined || OAUTH_CLIENT_SECRET === undefined) {
  log.error(`Missing environment variables. Please run "yarn setup" to reset your .env file.`);
  process.exit(1);
}

const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const ERR_NOT_CHANGED = "code-not-changed";

const queue = new PQueue({ concurrency: 10, interval: 1100, intervalCap: 20 });
let count = 0;
queue.on("active", () => count++);

async function fetchCodeToc(textId: string): Promise<TocApiResult> {
  return queue.add(async () => {
    log.info("fetch()", `fetch table des matieres ${textId}`);

    return retry(
      async () => {
        log.info("fetch()", `retry ${textId}`);
        return getTableMatieres(textId);
      },
      { retries: 20 },
    );
  });
}

const fetchAllArticlesFromRoot = async (
  node: TocApiResult,
) => {
  const [id] = node.id.split("_");
  node.id = id;
  const hasPrevisousCode = await exists(path.join(getDirname(), "..", "data", `${node.id}.json`));
  if (hasPrevisousCode) {
    const previousDateModif = (
      JSON.parse(
        (await readFile(path.join(getDirname(), "..", "data", `${node.id}.json`))).toString(),
      ) as LegiData.Code
    ).data.dateModif;
    log.info("fetch()", "data", { cid: node.cid, modifDate: node.modifDate, previousDateModif });
    if (previousDateModif === node.modifDate) {
      log.info("fetch()", "Unchanged.");
      throw new Error(ERR_NOT_CHANGED);
    }
  }

  const pSections = (node.sections ?? [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .map(async section => await fetchAllArticles(section, 1));
}
async function fetchAllArticles(
  node: TocSection,
  depth = 0,
): Promise<LegiData.Code | LegiData.CodeSection> {
  const pSections = (node.sections ?? [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .map(async section => await fetchAllArticles(section, depth + 1));

  const pArticles = (node.articles ?? [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .filter(latestArticleVersionFilter)
    .map(async ({ id }) =>
      queue.add(async () => {
        log.info("fetch()", `Fetching ${id}…`);

        return retry(async () => getArticle(id), { retries: 20 });
      }),
    );

  const sections = await Promise.all(pSections);
  const articles = (await Promise.all(pArticles)).map(toArticle);

  return {
    ...toCodeOrSection(node, depth),
    children: sections.concat(articles).sort(sortBy("intOrdre")),
  };
}

async function saveFile(container: LegiData.Code | LegiData.CodeSection): Promise<void> {
  await writeFile(
    path.join(getDirname(), "..", "data", `${container.data.id}.json`),
    JSON.stringify(container, null, 2),
  );
  log.info("fetch()", `Updating ${container.data.id}.json…`);
}

function toFix(value: number, nb = 2) {
  const digit = Math.pow(10, nb);

  return Math.round(value * digit) / digit;
}

function sortBy(key: string) {
  return function(
    a: LegiData.Code | LegiData.CodeSection,
    b: LegiData.Code | LegiData.CodeSection,
  ) {
    return a.data[key] - b.data[key];
  };
}

async function main() {
  const pipeline = pPipe(fetchCodeToc, fetchAllArticles, saveFile);

  const startAt = Date.now();
  const pCodes = CODES_TO_FETCH.map(async id =>
    pipeline(id).catch(async error => {
      if (error.message === ERR_NOT_CHANGED) {
        return Promise.resolve();
      }
      throw error;
    }),
  );

  await Promise.all(pCodes);
  log.info(
    "fetch()",
    `Done in ${toFix((Date.now() - startAt) / 1000)}s (${count} fetched articles).`,
  );
}

const t0 = Date.now();

main().catch(error => {
  log.error(error);
  log.error("fetch()", `Failed in ${toFix((Date.now() - t0) / 1000)}s.`);
  process.exit(-1);
});
