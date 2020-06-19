// @ts-check

const path = require("path");

const getIndexedCodes = require("./getIndexedCodes");
const isFile = require("../helpers/isFile");
const withCodeId = require("../helpers/withCodeId");

const INDEXED_CODES = getIndexedCodes();

/**
 * Check if an code is available.
 *
 * @param {string} codeId
 *
 * @returns {boolean}
 */
function hasCode(codeId) {
  try {
    const maybeIndexedCode = INDEXED_CODES.find(withCodeId(codeId));
    const maybeFilePath = path.join(__dirname, `../../data/${codeId}.json`);

    return maybeIndexedCode !== undefined && isFile(maybeFilePath);
  } catch (err) {
    return false;
  }
}

module.exports = hasCode;
