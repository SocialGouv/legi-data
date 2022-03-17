import unistUtilParents from "unist-util-parents";

import getIndexedCodes from "./getIndexedCodes";
import hasCode from "./hasCode";
import withCodeId from "../helpers/withCodeId";
import { LegiData, PromiseJson } from "../types";

const INDEXED_CODES = getIndexedCodes();

/**
 * Get a full code unist tree with its sections and articles.
 * Each node has a `parent` property with a pointer to its parent node.
 *
 * @param {string} codeId
 *
 * @returns {LegiData.CodeWithParents}
 */
async function getCodeWithParents(codeId: string): Promise<LegiData.CodeWithParents> {
  if (!hasCode(codeId)) {
    throw new Error(`No code found with this ID (${codeId}).`);
  }

  const maybeCode = INDEXED_CODES.find(withCodeId(codeId));
  if (maybeCode === undefined) {
    throw new Error(`No code found with this ID (${codeId}).`);
  }

  const code: PromiseJson<LegiData.Code> = await import(`../../data/${codeId}.json`);
  const data = code.default;
  const codeWithParents: LegiData.CodeWithParents = unistUtilParents(data);

  return codeWithParents;
}

export default getCodeWithParents;
