import type { CodeArticle, LegiData } from "../../src/types";
import { Code } from "../../src/types";
import type { ArticleApiResult, TocApiResult, TocArticle, TocSection } from "../types";

const numify = (id: string): number => parseInt(id.replace(/^LEGIARTI/, ""));

// the API returns all the version of a given article. we pick the latest one
export const latestArticleVersionFilter = (
  currentArticle: TocArticle,
  _: unknown,
  articles: TocArticle[] | null,
): boolean => {
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

export const toCodeOrSection = (
  node: TocApiResult | TocSection,
  depth: number,
): Omit<LegiData.Code, "children"> | Omit<LegiData.CodeSection, "children"> => {
  if (depth === 0) {
    return toCode(node);
  } else {
    return toSection(node);
  }
};

export const toCode = (node: TocApiResult): Omit<LegiData.Code, "children"> => {
  return {
    type: "code",
    data: {
      cid: node.cid,
      etat: node.etat,
      id: node.id,
      intOrdre: node.intOrdre ?? 0,
      title: node.title,
      dateModif: node.modifDate,
      dateDebutVersion: node.dateDebutVersion,
      dateFinVersion: node.dateFinVersion,
      // dateModif: node.dateModif,
    },
  };
};

export function toSection(node: TocSection): Omit<LegiData.CodeSection, "children"> {
  return {
    type: "section",
    data: {
      cid: node.cid,
      etat: node.etat,
      id: node.id,
      intOrdre: node.intOrdre || 0,
      title: node.title,
      dateDebut: node.dateDebut,
      dateFin: node.dateFin,
      dateModif: node.dateModif,
    },
  };
}

export function toArticle(node: ArticleApiResult): CodeArticle {
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
