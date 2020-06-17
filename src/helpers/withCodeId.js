/**
 * @param {string} codeId
 *
 * @returns {((indexedCode: LegiData.IndexedCode) => boolean)}
 */
function withCodeId(codeId) {
  return indexedCode => indexedCode.id === codeId;
}

module.exports = withCodeId;
