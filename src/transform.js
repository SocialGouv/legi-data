const numify = id => parseInt(id.replace(/^KALIARTI/, ""));

export const isValidSection = node =>
  !node.etat || node.etat.startsWith("VIGUEUR");

// the API returns all the version of a given article. we pick the latest one
export const latestArticleVersionFilter = (currentArticle, _, articles) => {
  // dont filter out articles without cid
  if (!currentArticle.cid) {
    return true;
  }
  const maxVersion = Math.max(
    ...((articles && articles) || [])
      .filter(
        article =>
          article.cid === currentArticle.cid && article.id !== currentArticle.id
      )
      .map(article => numify(article.id)),
    0
  );
  return numify(currentArticle.id) > maxVersion;
};

export function toSection(node, depth) {
  const type = depth === 0 ? "code" : "section";
  const data = {
    id: node.id,
    cid: node.cid,
    title: node.title,
    etat: node.etat,
    intOrdre: node.intOrdre || 0
  };
  if (depth === 0) {
    data.dateModif = node.modifDate;
    data.dateDebutVersion = node.dateDebutVersion;
    data.dateFinVersion = node.dateFinVersion;
  } else {
    data.dateDebut = node.dateDebut;
    data.dateFin = node.dateFin;
  }
  if (node.dateModif) {
    data.dateModif = node.dateModif;
  }
  return { type, data };
}

export function toArticle(node) {
  return {
    type: "article",
    data: {
      id: node.article.id,
      cid: node.article.cid,
      num: node.article.num,
      texte: node.article.texte,
      texteHtml: node.article.texteHtml,
      etat: node.article.etat,
      intOrdre: node.article.ordre,
      lienModifications: node.article.lienModifications,
      articleVersions: node.article.articleVersions,
      nota: node.article.nota,
      notaHtml: node.article.notaHtml,
      dateDebut: node.article.dateDebut,
      dateFin: node.article.dateFin,
      dateDebutExtension: node.article.dateDebutExtension,
      dateFinExtension: node.article.dateFinExtension
    }
  };
}
