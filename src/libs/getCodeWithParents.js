// @ts-check

const unistUtilParents = require("unist-util-parents");

const getIndexedCodes = require("./getIndexedCodes");
const hasCode = require("./hasCode");
const withCodeId = require("../helpers/withCodeId");

const INDEXED_CODES = getIndexedCodes();

/**
 * Get a full code unist tree with its sections and articles.
 * Each node has a `parent` property with a pointer to its parent node.
 *
 * @param {string} codeId
 *
 * @returns {LegiData.CodeWithParents}
 */
function getCodeWithParents(codeId) {
  if (!hasCode(codeId)) {
    throw new Error(`No code found with this ID (${codeId}).`);
  }

  const maybeCode = INDEXED_CODES.find(withCodeId(codeId));
  if (maybeCode === undefined) {
    throw new Error(`No code found with this ID (${codeId}).`);
  }

  const code =
    /** @type {LegiData.Code} */
    (require(`../../data/${codeId}.json`));
  const codeWithParents =
    /** @type {LegiData.CodeWithParents} */
    (unistUtilParents(code));

  return codeWithParents;
}

module.exports = getCodeWithParents;
