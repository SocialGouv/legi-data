// @ts-check

const checkArticleIdOrCid = require("../helpers/checkArticleIdOrCid");
const withArticleIdOrCid = require("../helpers/withArticleIdOrCid");
const getIndexedArticles = require("./getIndexedArticles");

const INDEXED_ARTICLES = getIndexedArticles();

/**
 * Check if an article is available.
 *
 * @param {string} articleIdOrCid
 *
 * @returns {boolean}
 */
function hasArticle(articleIdOrCid) {
  try {
    checkArticleIdOrCid(articleIdOrCid);

    return INDEXED_ARTICLES.find(withArticleIdOrCid(articleIdOrCid)) !== undefined;
  } catch (err) {
    return false;
  }
}

module.exports = hasArticle;
