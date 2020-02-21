const pTimeout = require("p-timeout");
const debug = require("debug")("@socialgouv/legi-data:getArticle");

const MAX_TIMEOUT = 10000;
const MAX_TENTATIVES = 30;

// slimify
const toArticle = article => ({
  id: article.id,
  cid: article.cid,
  type: article.type,
  num: article.num,
  texte: article.texte,
  texteHtml: article.texteHtml,
  etat: article.etat,
  lienModifications: article.lienModifications,
  articleVersions: article.articleVersions,
  nota: article.nota,
  notaHtml: article.notaHtml,
  dateDebut: article.dateDebut,
  dateFin: article.dateFin,
  dateDebutExtension: article.dateDebutExtension,
  dateFinExtension: article.dateFinExtension
});

const getArticle = (dilaClient, id, tries = 0) =>
  pTimeout(
    dilaClient.fetch({
      path: "consult/getArticle",
      method: "POST",
      params: {
        id
      }
    }),
    MAX_TIMEOUT,
    e => {
      debug(`timed out ${id}`);
      throw e;
    }
  )
    .then(data => {
      if (data.article) {
        debug(`getArticle ${id} OK`);
        return toArticle(data.article);
      }
      throw new Error(`Cant get article ${id} (${tries + 1})`);
    })
    // retry
    .catch(e => {
      if (tries < MAX_TENTATIVES) {
        debug(`getArticle ${id} ${tries + 2}/${MAX_TENTATIVES}`);
        return getArticle(dilaClient, id, tries + 1);
      }
      console.log(e);
      throw e;
    });

module.exports = getArticle;
