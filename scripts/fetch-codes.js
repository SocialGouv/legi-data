const fs = require("fs");
const util = require("util");
const pAll = require("p-all");
const debug = require("debug")("@socialgouv/legi-data");

const getCode = require("../src/getCode");

/*
  download and stores all codes in ../data/[id].json
  based on the list in data/index.json
*/

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const fetch = async () => {
  const codes = require("../data/index.json");

  return await pAll(
    codes
      .filter(code => code.etat === "VIGUEUR")
      .map(code => async () => {
        debug(`fetching ${code.id}...`);
        const target = `./data/${code.id}.json`;
        const targetExists = await exists(target);
        let currentDateModif;
        if (targetExists) {
          const currentData = JSON.parse((await readFile(target)).toString());
          currentDateModif = currentData.data.dateModif;
        }
        return getCode(
          {
            date: new Date().getTime(),
            sctId: "",
            textId: code.id
          },
          currentDateModif
        )
          .then(async data => {
            await writeFile(target, JSON.stringify(data, null, 2));
            debug(`wrote ${target}`);
          })
          .catch(e => {
            if (e.message === "not changed") {
              debug(`${code.id}: skip, not changed`);
              return Promise.resolve();
            }
            debug(`${code.id}: ${e}`);
            throw e;
          });
      }),
    { concurrency: 1 }
  );
};

if (require.main === module) {
  fetch();
  console.log("FINISHED");
}
