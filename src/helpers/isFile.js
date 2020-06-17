// @ts-check

const fs = require("fs");

/**
 * @param {string} absolutePath
 *
 * @returns {boolean}
 */
function isFile(absolutePath) {
  return fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isFile();
}

module.exports = isFile;
