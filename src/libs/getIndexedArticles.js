// @ts-check

const INDEXED_ARTICLES =
  /** @type {LegiData.IndexedArticle[]} */
  (require("../../data/articles/index.json"));

/**
 * Get the full list of indexed articles.
 *
 * @returns {LegiData.IndexedArticle[]}
 */
function getIndexedArticles() {
  return INDEXED_ARTICLES;
}

module.exports = getIndexedArticles;
