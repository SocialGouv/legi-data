// @ts-check

const INDEXED_CODES =
  /** @type {LegiData.IndexedCode[]} */
  (require("../../data/index.json"));

/**
 * Get the full list of indexed codes.
 *
 * @returns {LegiData.IndexedCode[]}
 */
function getCodes() {
  return INDEXED_CODES;
}

module.exports = getCodes;
