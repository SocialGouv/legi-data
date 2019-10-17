const fs = require("fs");
const util = require("util");
const pAll = require("p-all");
const debug = require("debug")("@socialgouv/legi-data");

const getCode = require("../src/getCode");

/*
  download and stores all codes in ../data/[id].json
  based on the list in data/index.json
*/

const codesToFetch = [
  "LEGITEXT000006072050",
  "LEGITEXT000022197698",
  "LEGITEXT000031366350"
];

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const fetchCode = async id => {
  debug(`fetching ${id}...`);
  console.log(`fetching ${id}...`);
  const target = `./data/${id}.json`;
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
      textId: id
    },
    currentDateModif
  )
    .then(async data => {
      await writeFile(target, JSON.stringify(data, null, 2));
      debug(`wrote ${target}`);
    })
    .catch(e => {
      if (e.message === "not changed") {
        debug(`${id}: skip, not changed`);
        console.log(`${id}: skip, not changed`);
        return Promise.resolve();
      }
      debug(`${id}: ${e}`);
      throw e;
    });
};

const fetch = async () => {
  const codes = require("../data/index.json");

  return await pAll(
    codes
      .filter(code => code.etat === "VIGUEUR")
      .filter(code => codesToFetch.includes(code.id)) // exclude code du commerce, bug API DILA
      .map(code => () => fetchCode(code.id)),
    { concurrency: 1 }
  );
};

if (require.main === module) {
  fetch()
    .then(() => {
      console.log("FINISHED");
    })
    .catch(e => {
      console.log("e", e);
      throw e;
    });
}
