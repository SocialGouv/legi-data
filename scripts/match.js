// @ts-check

/**
 * Generate an articles index matching articles ID & CID with their code ID.
 */

import fs from "fs";
import log from "npmlog";
import path from "path";
import unistUtilFlatFilter from "unist-util-flat-filter";

import { getCodeWithParents, getIndexedCodes, hasCode } from "../src";

log.enableColor();
const INDEXED_CODE = getIndexedCodes();

/**
 * @param {LegiData.IndexedCode} code
 *
 * @returns {boolean}
 */
const checkCode = code => hasCode(code.id);

/**
 * @param {LegiData.IndexedCode} indexedCode
 *
 * @returns {LegiData.IndexedArticle[]}
 */
const getCodeIndexedArticles = indexedCode => {
  const { id: codeId } = indexedCode;
  const codeWithParents = getCodeWithParents(codeId);
  const codeWithFlatArticles =
    /** @type {{ type: "root", children: LegiData.CodeArticle[] }} */
    (/** @type {*} */ (unistUtilFlatFilter(codeWithParents, "article")));

  return codeWithFlatArticles.children.map(({ data: { cid: articleCid, id: articleId } }) => ({
    articleCid,
    articleId,
    codeId,
  }));
};

log.info("match()", `Indexing articles…`);
/** @type {LegiData.IndexedArticle[]} */
const indexedArticles = INDEXED_CODE.filter(checkCode).map(getCodeIndexedArticles).flat();

const indexedArticlesFilePath = path.join(__dirname, "..", "data", "articles", "index.json");
log.info("match()", `Writing ${indexedArticlesFilePath}…`);
fs.writeFileSync(indexedArticlesFilePath, JSON.stringify(indexedArticles, null, 2));

log.info("match()", `Done.`);
