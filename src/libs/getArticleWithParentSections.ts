import unistUtilFind from "unist-util-find";

import type { LegiData } from "../types";
import getCodeWithParents from "./getCodeWithParents";
import getIndexedArticle from "./getIndexedArticle";

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
  const sections: any[] = [];
  let section = article.parent;

  while (section) {
    const { data, type } = section;
    sections.unshift({ data, type });

    section =
      /** @type {LegiData.CodeSectionWithParent} */
      section.parent;
  }

  return sections;
};

/**
 * Get a code article unist node with its parent sections.
 */
async function getArticleWithParentSections(
  articleIdOrCid: string,
): Promise<LegiData.CodeArticleWithParentSections> {
  const { codeId } = getIndexedArticle(articleIdOrCid);
  const codeWithParents = await getCodeWithParents(codeId);

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

export default getArticleWithParentSections;
