import checkArticleIdOrCid from "../helpers/checkArticleIdOrCid";
import withArticleIdOrCid from "../helpers/withArticleIdOrCid";
import getIndexedArticles from "./getIndexedArticles";

const INDEXED_ARTICLES = getIndexedArticles();

/**
 * Check if an article is available.
 */
function hasArticle(articleIdOrCid: string): boolean {
  try {
    checkArticleIdOrCid(articleIdOrCid);

    return INDEXED_ARTICLES.find(withArticleIdOrCid(articleIdOrCid)) !== undefined;
  } catch (err) {
    return false;
  }
}

export default hasArticle;
