/**
 * Update codes list markdown file.
 */

import * as fs from "fs";
import * as path from "path";
import { dirname } from "path";
import { Logger } from "tslog";
import { fileURLToPath } from "url";

import { getIndexedCodes } from "../src/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const log = new Logger();
const INDEXED_CODES = getIndexedCodes();

const clean = str => ("" + (str || "")).replace(/&#13;/g, "").replace(/\n/g, " ").trim();
const getCodeLastUpdate = async id => {
  try {
    const { default: code } = await import(`../data/${id}.json`);

    return code.data.dateModif.split("-").reverse().join("/");
  } catch (e) {
    log.error("list()", `Failed to open ${id}.json file`, e);
  }
};

const main = async () => {
  const sourceLines: string[] = await Promise.all(
    INDEXED_CODES.filter(code => code.etat === "VIGUEUR")
      .filter(code => fs.existsSync(path.join(__dirname, `../data/${code.id}.json`)))
      .map(
        async code =>
          `${clean(code.id)} | ${clean(code.titre)} | ${clean(await getCodeLastUpdate(code.id))}`,
      ),
  );

  log.info("list()", `Updating REFERENCES.md…`);
  const filePath = path.join(__dirname, "..", "REFERENCES.md");
  const source = [`id | title | date_publi`, `---|-------|-----------`, ...sourceLines].join("\n");
  fs.writeFileSync(filePath, source);
};

main()
  .then(() => {
    log.info("list()", `Done.`);
  })
  .catch(error => {
    log.error("list()", "Failed", error);
  });
