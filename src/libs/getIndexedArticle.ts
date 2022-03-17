import checkArticleIdOrCid from "../helpers/checkArticleIdOrCid";
import withArticleIdOrCid from "../helpers/withArticleIdOrCid";
import getIndexedArticles from "./getIndexedArticles";
import { LegiData } from "../types";

const INDEXED_ARTICLES = getIndexedArticles();

/**
 * Get an indexed article.
 */
function getIndexedArticle(articleIdOrCid: string): LegiData.IndexedArticle {
  checkArticleIdOrCid(articleIdOrCid);

  const maybeIndexedArticle = INDEXED_ARTICLES.find(withArticleIdOrCid(articleIdOrCid));
  if (maybeIndexedArticle === undefined) {
    throw new Error(`No code article found with this ID or CID (${articleIdOrCid}).`);
  }

  return maybeIndexedArticle;
}

export default getIndexedArticle;
