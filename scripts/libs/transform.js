const numify = id => parseInt(id.replace(/^KALIARTI/, ""));

export const isValidSection = node => !node.etat || node.etat.startsWith("VIGUEUR");

// the API returns all the version of a given article. we pick the latest one
export const latestArticleVersionFilter = (currentArticle, _, articles) => {
  // dont filter out articles without cid
  if (!currentArticle.cid) {
    return true;
  }
  const maxVersion = Math.max(
    ...((articles && articles) || [])
      .filter(article => article.cid === currentArticle.cid && article.id !== currentArticle.id)
      .map(article => numify(article.id)),
    0,
  );

  return numify(currentArticle.id) > maxVersion;
};

export function toSection(node, depth) {
  const type = depth === 0 ? "code" : "section";
  const data = {
    cid: node.cid,
    etat: node.etat,
    id: node.id,
    intOrdre: node.intOrdre || 0,
    title: node.title,
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

  return { data, type };
}

export function toArticle(node) {
  return {
    data: {
      articleVersions: node.article.articleVersions,
      cid: node.article.cid,
      dateDebut: node.article.dateDebut,
      dateDebutExtension: node.article.dateDebutExtension,
      dateFin: node.article.dateFin,
      dateFinExtension: node.article.dateFinExtension,
      etat: node.article.etat,
      id: node.article.id,
      intOrdre: node.article.ordre,
      lienModifications: node.article.lienModifications,
      nota: node.article.nota,
      notaHtml: node.article.notaHtml,
      num: node.article.num,
      texte: node.article.texte,
      texteHtml: node.article.texteHtml,
    },
    type: "article",
  };
}
