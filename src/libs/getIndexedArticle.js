// @ts-check

const checkArticleIdOrCid = require("../helpers/checkArticleIdOrCid");
const withArticleIdOrCid = require("../helpers/withArticleIdOrCid");
const getIndexedArticles = require("./getIndexedArticles");

const INDEXED_ARTICLES = getIndexedArticles();

/**
 * Get an indexed article.
 *
 * @param {string} articleIdOrCid
 *
 * @returns {LegiData.IndexedArticle}
 */
function getIndexedArticle(articleIdOrCid) {
  checkArticleIdOrCid(articleIdOrCid);

  const maybeIndexedArticle = INDEXED_ARTICLES.find(withArticleIdOrCid(articleIdOrCid));
  if (maybeIndexedArticle === undefined) {
    throw new Error(`No code article found with this ID or CID (${articleIdOrCid}).`);
  }

  return maybeIndexedArticle;
}

module.exports = getIndexedArticle;
