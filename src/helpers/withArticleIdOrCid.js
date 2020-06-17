/**
 * @param {string} articleIdOrCid
 *
 * @returns {((indexedArticle: LegiData.IndexedArticle) => boolean)}
 */
function withArticleIdOrCid(articleIdOrCid) {
  return indexedArticle =>
    indexedArticle.articleId === articleIdOrCid || indexedArticle.articleCid === articleIdOrCid;
}

module.exports = withArticleIdOrCid;
