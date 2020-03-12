import fs from "fs";
import path from "path";
import Queue from "p-queue";
import pPipe from "p-pipe";
import retry from "p-retry";

import { promisify } from "util";

const codesToFetch = [
  "LEGITEXT000006072050",
  "LEGITEXT000022197698",
  "LEGITEXT000031366350"
];

import { getTableMatieres, getArticle } from "../src/api";

const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const ERR_NOT_CHANGED = "code-not-changed";
const queue = new Queue({ concurrency: 10, intervalCap: 20, interval: 1100 });
let count = 0;
queue.on("active", () => count++);
const t0 = Date.now();

function fetchCodeToc(textId) {
  return queue.add(() => {
    console.log(`fetch table des matieres ${textId}`);
    return retry(() => getTableMatieres({ textId }), { retries: 10 });
  });
}

async function fetchAllArticles(node, depth = 0) {
  const [id] = node.id.split("_");
  node.id = id;
  const hasPrevisousCode = await exists(
    path.join(__dirname, "..", "data", `${node.id}.json`)
  );
  if (hasPrevisousCode) {
    const previousDateModif = JSON.parse(
      (
        await readFile(path.join(__dirname, "..", "data", `${node.id}.json`))
      ).toString()
    ).data.dateModif;
    console.log(node.cid, previousDateModif, node.modifDate);
    if (previousDateModif === node.modifDate) {
      console.log("not changed");
      throw new Error(ERR_NOT_CHANGED);
    }
  }
  const pSections = (node.sections || [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .map(section => fetchAllArticles(section, depth + 1));

  const pArticles = (node.articles || [])
    .filter(({ etat }) => etat.startsWith("VIGUEUR"))
    .map(({ id }) =>
      queue.add(() => {
        console.log(` › fetch article ${id}`);
        return retry(() => getArticle(id), { retries: 10 });
      })
    );

  const sections = await Promise.all(pSections);
  const articles = (await Promise.all(pArticles)).map(toArticle);
  return {
    ...toSection(node, depth),
    children: sections.concat(articles).sort(sortBy("intOrdre"))
  };
}

function toSection(node, depth) {
  const type = depth === 0 ? "code" : "section";
  const data = {
    id: node.id,
    cid: node.cid,
    title: node.title,
    etat: node.etat,
    intOrdre: node.intOrdre || 0
  };
  if (depth === 0) {
    data.dateModif = node.modifDate;
    data.dateDebutVersion = node.dateDebutVersion;
    data.dateFinVersion = node.dateFinVersion;
  } else {
    data.dateDebut = node.dateDebut;
    data.dateFin = node.dateFin;
  }
  if (node.dateModif) {
    data.dateModif = node.dateModif;
  }
  return { type, data };
}

function toArticle(node) {
  return {
    type: "article",
    data: {
      id: node.article.id,
      cid: node.article.cid,
      num: node.article.num,
      texte: node.article.texte,
      texteHtml: node.article.texteHtml,
      etat: node.article.etat,
      intOrdre: node.article.ordre,
      lienModifications: node.article.lienModifications,
      articleVersions: node.article.articleVersions,
      nota: node.article.nota,
      notaHtml: node.article.notaHtml,
      dateDebut: node.article.dateDebut,
      dateFin: node.article.dateFin,
      dateDebutExtension: node.article.dateDebutExtension,
      dateFinExtension: node.article.dateFinExtension
    }
  };
}

async function saveFile(container) {
  await writeFile(
    path.join(__dirname, "..", "data", `${container.data.id}.json`),
    JSON.stringify(container, 0, 2)
  );
  console.log(`› write ${container.data.id}.json`);
}

function toFix(value, nb = 2) {
  const digit = Math.pow(10, nb);
  return Math.round(value * digit) / digit;
}

function sortBy(key) {
  return function(a, b) {
    return a.data[key] - b.data[key];
  };
}

async function main() {
  const pipeline = pPipe(fetchCodeToc, fetchAllArticles, saveFile);

  const t0 = Date.now();
  const pCodes = codesToFetch.map(id =>
    pipeline(id).catch(error => {
      if (error.message === ERR_NOT_CHANGED) {
        return Promise.resolve();
      }
      throw error;
    })
  );

  await Promise.all(pCodes);
  console.log(
    `››› Done in ${toFix((Date.now() - t0) / 1000)} s | fetch ${count} articles`
  );
}

main().catch(error => {
  console.error(error);
  console.log(`››› Failed in ${toFix((Date.now() - t0) / 1000)} s`);
  process.exit(-1);
});
