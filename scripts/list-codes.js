const fs = require("fs");
const path = require("path");
const codes = require("../data/index.json");

// produce a markdown table from existing data/index.json

console.log(`id | title | date_publi`);
console.log(`---|-------|-----------`);

const clean = str =>
  ("" + (str || ""))
    .replace(/&#13;/g, "")
    .replace(/\n/g, " ")
    .trim();

const getCodeLastUpdate = id => {
  const code = require(`../data/${id}.json`);
  return code.data.dateModif
    .split("-")
    .reverse()
    .join("/");
};

codes
  .filter(code => code.etat === "VIGUEUR")
  .filter(code =>
    fs.existsSync(path.join(__dirname, `../data/${code.id}.json`))
  )
  .forEach(code => {
    console.log(
      `${clean(code.id)} | ${clean(code.titre)} | ${clean(
        getCodeLastUpdate(code.id)
      )}`
    );
  });
