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
  const data = require(`../data/${id}.json`);
  return data.dateModif
    .split("-")
    .reverse()
    .join("/");
};

codes
  .filter(code => code.etat === "VIGUEUR")
  .forEach(code => {
    console.log(
      `${clean(code.id)} | ${clean(code.titre)} | ${clean(
        getCodeLastUpdate(code.id)
      )}`
    );
  });
