const debug = require("debug")("@socialgouv/legi-data:getCode");
const DilaApi = require("@socialgouv/dila-api-client");
const pAll = require("p-all");

const dilaClient = new DilaApi();

const getArticle = require("../src/getArticle");

/*
 fetch a full code from table des matieres and add all individual articles
*/

const tableMatieres = params =>
  dilaClient.fetch({
    path: "consult/code/tableMatieres",
    method: "POST",
    params
  });

// slimify
const toSection = section => ({
  ...((section.type === "code" && {
    dateDebutVersion: section.dateDebutVersion,
    dateFinVersion: section.dateFinVersion
  }) || {
    dateDebut: section.dateDebut,
    dateFin: section.dateFin,
    intOrdre: section.intOrdre
  }),
  type: section.type || "section",
  id: section.id,
  cid: section.cid,
  title: section.title,
  dateModif: section.dateModif,
  etat: section.etat,
  jurisDate: section.jurisDate
});

// embed article details into the section
const embedArticles = async section => ({
  ...toSection(section),
  articles:
    section.articles &&
    (await pAll(
      section.articles
        .filter(article => article.etat === "VIGUEUR")
        .map(article => () => {
          debug(`getArticle ${article.id}`);
          return getArticle(dilaClient, article.id);
        }),
      { concurrency: 5 }
    )),
  sections:
    section.sections &&
    (await pAll(
      section.sections
        .filter(section => section.etat === "VIGUEUR")
        .map(section => () => {
          debug(`embedArticles section ${section.id}`);
          return embedArticles(section);
        }),
      { concurrency: 2 }
    ))
});

const astify = node => ({
  type: "section",
  data: {
    ...node,
    articles: undefined,
    sections: undefined
  },
  children: [
    ...((node.sections && node.sections.map(astify)) || []),
    ...((node.articles &&
      node.articles.map(article => ({
        type: "article",
        data: article
      }))) ||
      [])
  ]
});

// get structure + content. throw if dateModif is the same in the new version
const getCode = (params, dateModif) =>
  tableMatieres(params)
    .then(code => ({
      type: "code",
      cid: code.cid,
      id: params.textId,
      title: code.title,
      etat: code.etat,
      dateModif: code.modifDate,
      jurisDate: code.jurisDate,
      dateDebutVersion: code.dateDebutVersion,
      dateFinVersion: code.dateFinVersion,
      sections: code.sections,
      articles: code.articles
    }))
    .then(sommaire => {
      // skip articles embedding if not changed
      if (dateModif && sommaire.dateModif === dateModif) {
        throw new Error("not changed");
      }
      return sommaire;
    })
    .then(embedArticles)
    .then(astify);

module.exports = getCode;
