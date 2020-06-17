// @ts-check

/**
 * Update codes list markdown file.
 */

import fs from "fs";
import log from "npmlog";
import path from "path";

import { getIndexedCodes } from "..";

log.enableColor();
const INDEXED_CODES = getIndexedCodes();

const clean = str => ("" + (str || "")).replace(/&#13;/g, "").replace(/\n/g, " ").trim();
const getCodeLastUpdate = id => {
  const code = require(`../data/${id}.json`);

  return code.data.dateModif.split("-").reverse().join("/");
};

const sourceLines = INDEXED_CODES.filter(code => code.etat === "VIGUEUR")
  .filter(code => fs.existsSync(path.join(__dirname, `../data/${code.id}.json`)))
  .map(code => `${clean(code.id)} | ${clean(code.titre)} | ${clean(getCodeLastUpdate(code.id))}`);

log.info("list()", `Updating REFERENCES.md…`);
const filePath = path.join(__dirname, "..", "REFERENCES.md");
const source = [`id | title | date_publi`, `---|-------|-----------`, ...sourceLines].join("\n");
fs.writeFileSync(filePath, source);

log.info("list()", `Done.`);
