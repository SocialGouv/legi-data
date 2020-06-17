// @ts-check

const getIndexedCodes = require("./getIndexedCodes");
const hasCode = require("./hasCode");
const withCodeId = require("../helpers/withCodeId");

const INDEXED_CODES = getIndexedCodes();

/**
 * Get a full code unist tree with its sections and articles.
 *
 * @param {string} codeId
 *
 * @returns {LegiData.Code}
 */
function getCode(codeId) {
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

  return code;
}

module.exports = getCode;
