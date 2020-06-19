// @ts-check

const unistUtilFind = require("unist-util-find");

const getCodeWithParents = require("./getCodeWithParents");
const getIndexedArticle = require("./getIndexedArticle");

/**
 * @param {LegiData.CodeWithParents} codeWithParents
 * @param {Partial<LegiData.CodeArticleData>} data
 *
 * @returns {LegiData.CodeArticleWithParent=}
 */
const findArticleWithData = (codeWithParents, data) =>
  unistUtilFind(codeWithParents, {
    data,
    type: "article",
  });

/**
 * @param {LegiData.CodeArticleWithParent} article
 *
 * @returns {LegiData.CodeArticleWithParentSections["sections"]}
 */
const getParentSectionsFromArticle = article => {
  /** @type {LegiData.CodeArticleWithParentSections["sections"]} */
  const sections = [];
  let section = article.parent;

  while (section) {
    const { data, type } = section;
    sections.unshift({ data, type });

    section =
      /** @type {LegiData.CodeSectionWithParent} */
      (section.parent);
  }

  return sections;
};

/**
 * Get a code article unist node with its parent sections.
 *
 * @param {string} articleIdOrCid
 *
 * @returns {LegiData.CodeArticleWithParentSections}
 */
function getArticleWithParentSections(articleIdOrCid) {
  const { codeId } = getIndexedArticle(articleIdOrCid);
  const codeWithParents = getCodeWithParents(codeId);

  // First attempt with an article ID:
  const maybeArticleWithId = findArticleWithData(codeWithParents, { id: articleIdOrCid });
  if (maybeArticleWithId !== undefined) {
    /** @type {LegiData.CodeArticleWithParentSections} */
    const articleWithParentSections = {
      ...maybeArticleWithId,
      sections: getParentSectionsFromArticle(maybeArticleWithId),
    };

    return articleWithParentSections;
  }

  // Second attempt with an article CID:
  const maybeArticleWithCid = findArticleWithData(codeWithParents, { cid: articleIdOrCid });
  if (maybeArticleWithCid === undefined) {
    throw new Error(`No agreement article found with this ID or CID (${articleIdOrCid}).`);
  }

  /** @type {LegiData.CodeArticleWithParentSections} */
  const articleWithParentSections = {
    ...maybeArticleWithCid,
    sections: getParentSectionsFromArticle(maybeArticleWithCid),
  };

  return articleWithParentSections;
}

module.exports = getArticleWithParentSections;
