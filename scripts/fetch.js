import fs from "fs";
import log from "npmlog";
import pPipe from "p-pipe";
import Queue from "p-queue";
import retry from "p-retry";
import path from "path";
import { promisify } from "util";

import { getArticle, getTableMatieres } from "./libs/api";
import { latestArticleVersionFilter, toArticle, toSection } from "./libs/transform";

log.enableColor();

const CODES_TO_FETCH = [
  "LEGITEXT000006072050",
  "LEGITEXT000022197698",
  "LEGITEXT000031366350",
  "LEGITEXT000006073189",
];
const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

if (OAUTH_CLIENT_ID === undefined || OAUTH_CLIENT_SECRET === undefined) {
  log.error(
    "fetch()",
    `Missing environment variables. Please run "yarn setup" to reset your .env file.`,
  );

  process.exit(-1);
}

const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const ERR_NOT_CHANGED = "code-not-changed";

const queue = new Queue({ concurrency: 10, interval: 1100, intervalCap: 20 });
let count = 0;
queue.on("active", () => count++);
const t0 = Date.now();

function fetchCodeToc(textId) {
  return queue.add(() => {
    log.info("fetch()", `fetch table des matieres ${textId}`);

    return retry(() => getTableMatieres({ textId }), { retries: 20 });
  });
}

async function fetchAllArticles(node, depth = 0) {
  const [id] = node.id.split("_");
  node.id = id;
  const hasPrevisousCode = await exists(path.join(__dirname, "..", "data", `${node.id}.json`));
  if (hasPrevisousCode) {
    const previousDateModif = JSON.parse(
      (await readFile(path.join(__dirname, "..", "data", `${node.id}.json`))).toString(),
    ).data.dateModif;
    log.info("fetch()", { cid: node.cid, modifDate: node.modifDate, previousDateModif });
    if (previousDateModif === node.modifDate) {
      log.info("fetch()", "Unchanged.");
      throw new Error(ERR_NOT_CHANGED);
    }
  }

  const pSections = (node.sections || [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .map(section => fetchAllArticles(section, depth + 1));

  const pArticles = (node.articles || [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .filter(latestArticleVersionFilter)
    .map(({ id }) =>
      queue.add(() => {
        log.info("fetch()", `Fetching ${id}…`);

        return retry(() => getArticle(id), { retries: 20 });
      }),
    );

  const sections = await Promise.all(pSections);
  const articles = (await Promise.all(pArticles)).map(toArticle);

  return {
    ...toSection(node, depth),
    children: sections.concat(articles).sort(sortBy("intOrdre")),
  };
}

async function saveFile(container) {
  await writeFile(
    path.join(__dirname, "..", "data", `${container.data.id}.json`),
    JSON.stringify(container, 0, 2),
  );
  log.info("fetch()", `Updating ${container.data.id}.json…`);
}

function toFix(value, nb = 2) {
  const digit = Math.pow(10, nb);

  return Math.round(value * digit) / digit;
}

function sortBy(key) {
  return function (a, b) {
    return a.data[key] - b.data[key];
  };
}

async function main() {
  const pipeline = pPipe(fetchCodeToc, fetchAllArticles, saveFile);

  const t0 = Date.now();
  const pCodes = CODES_TO_FETCH.map(id =>
    pipeline(id).catch(error => {
      if (error.message === ERR_NOT_CHANGED) {
        return Promise.resolve();
      }
      throw error;
    }),
  );

  await Promise.all(pCodes);
  log.info("fetch()", `Done in ${toFix((Date.now() - t0) / 1000)}s (${count} fetched articles).`);
}

main().catch(error => {
  console.error(error);
  log.error("fetch()", `Failed in ${toFix((Date.now() - t0) / 1000)}s.`);
  process.exit(-1);
});
