/**
 * Generate an articles index matching articles ID & CID with their code ID.
 */

import * as fs from "fs";
import * as path from "path";
import { Logger } from "tslog";
import unistUtilFlatFilter from "unist-util-flat-filter";

import { getCodeWithParents, getIndexedCodes, hasCode } from "../src";
import type { LegiData } from "../src/types";

const log: Logger = new Logger();

const INDEXED_CODE = getIndexedCodes();

const checkCode = (code: LegiData.IndexedCode): boolean => hasCode(code.id);

const getCodeIndexedArticles = async (
  indexedCode: LegiData.IndexedCode,
): Promise<LegiData.IndexedArticle[]> => {
  const { id: codeId } = indexedCode;
  const codeWithParents = await getCodeWithParents(codeId);
  log.info("match()", "codeWithParents", Object.keys(codeWithParents).join(","));
  const codeWithFlatArticles: { type: "root"; children: LegiData.CodeArticle[] } | null =
    unistUtilFlatFilter(codeWithParents, "article");

  return (
    codeWithFlatArticles?.children.map(({ data: { cid: articleCid, id: articleId } }) => ({
      articleCid,
      articleId,
      codeId,
    })) ?? []
  );
};

const main = async () => {
  log.info("match()", `Indexing articles…`);
  const indexedArticleArrays = await Promise.all(
    INDEXED_CODE.filter(checkCode).map(getCodeIndexedArticles),
  );
  log.info("match()", "Indexed arrays", indexedArticleArrays.length);
  indexedArticleArrays.forEach((array, index) => {
    log.info("match()", `Indexed[${index}]`, array.length);
  });
  const indexedArticles = ([] as LegiData.IndexedArticle[]).concat(...indexedArticleArrays);

  const indexedArticlesFilePath = path.join(__dirname, "..", "data", "articles", "index.json");
  log.info("match()", `Writing ${indexedArticlesFilePath}…`);
  fs.writeFileSync(indexedArticlesFilePath, JSON.stringify(indexedArticles, null, 2));
};

main()
  .then(() => {
    log.info("match()", `Done.`);
  })
  .catch(error => {
    log.error("match()", "Failed.", error);
  });
