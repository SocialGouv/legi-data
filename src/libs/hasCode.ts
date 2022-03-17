import path from "path";

import { isFile } from "../helpers";
import getDirname from "../helpers/getDirname";
import withCodeId from "../helpers/withCodeId";
import getIndexedCodes from "./getIndexedCodes";

const INDEXED_CODES = getIndexedCodes();

/**
 * Check if an code is available.
 */
function hasCode(codeId: string): boolean {
  try {
    const maybeIndexedCode = INDEXED_CODES.find(withCodeId(codeId));
    const currentDirname = getDirname();
    const maybeFilePath = path.join(currentDirname, `../../data/${codeId}.json`);

    return maybeIndexedCode !== undefined && isFile(maybeFilePath);
  } catch (err: unknown) {
    console.log("Erreur hasCode", err);
    return false;
  }
}

export default hasCode;
