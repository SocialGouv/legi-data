import withCodeId from "../helpers/withCodeId";
import type { LegiData, PromiseJson } from "../types";
import getIndexedCodes from "./getIndexedCodes";
import hasCode from "./hasCode";

const INDEXED_CODES = getIndexedCodes();

/**
 * Get a full code unist tree with its sections and articles.
 */
async function getCode(codeId: string): Promise<LegiData.Code> {
  if (!hasCode(codeId)) {
    throw new Error(`No code found with this ID (${codeId}).`);
  }

  const maybeCode = INDEXED_CODES.find(withCodeId(codeId));
  if (maybeCode === undefined) {
    throw new Error(`No code found with this ID (${codeId}).`);
  }

  const code: PromiseJson<LegiData.Code> = await import(`../../data/${codeId}.json`);

  return code.default;
}

export default getCode;
