// @ts-check

/**
 * @param {string} articleIdOrCid
 *
 * @returns {void}
 */
function checkArticleIdOrCid(articleIdOrCid) {
  if (typeof articleIdOrCid !== "string" || !/^LEGIARTI\d{12}$/.test(articleIdOrCid)) {
    throw new Error(
      `<articleIdOrCid> is malformed (${articleIdOrCid}). ` +
      `It must be a valid code article ID or CID (string: "LEGIARTI123456789012").`,
    );
  }
}

export default checkArticleIdOrCid;
