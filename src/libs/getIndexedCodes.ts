import INDEXED_CODES from "../../data/index.json";
import { LegiData } from "../types";

/**
 * Get the full list of indexed codes.
 */
function getCodes(): LegiData.IndexedCode[] {
  return INDEXED_CODES;
}

export default getCodes;
