// Type definitions for @socialgouv/legi-data

/**
 * Get a code article unist node with its parent sections.
 */
export function getArticleWithParentSections(
  articleIdOrCid: string,
): LegiData.CodeArticleWithParentSections;

/**
 * Get a full code unist tree with its sections and articles.
 */
export function getCode(codeId: string): LegiData.Code;

/**
 * Get a full code unist tree with its sections and articles.
 * Each node has a `parent` property with a pointer to its parent node.
 */
export function getCodeWithParents(codeId: string): LegiData.CodeWithParents;

/**
 * Get an indexed article.
 */
export function getIndexedArticle(articleIdOrCid: string): LegiData.IndexedArticle;

/**
 * Get the full list of indexed articles.
 */
export function getIndexedArticles(): LegiData.IndexedArticle[];

/**
 * Get the full list of indexed codes.
 */
export function getIndexedCodes(): LegiData.IndexedCode[];

/**
 * Check if an article is available.
 */
export function hasArticle(articleIdOrCid: string): boolean;

/**
 * Check if an code is available.
 */
export function hasCode(codeId: string): boolean;

/**
 * TODO Check and describe types.
 */
export as namespace LegiData;

/**
 * Code or Article State.
 *
 * - ABROGE: ...
 * - DENONCE: ...
 * - MODIFIE: ...
 * - PERIME: ...
 * - REMPLACE: ...
 * - VIGUEUR: ...
 * - VIGUEUR_ETEN: ...
 * - VIGUEUR_NON_ETEN: ...
 */
type State =
  | "ABROGE"
  | "DENONCE"
  | "MODIFIE"
  | "PERIME"
  | "REMPLACE"
  | "VIGUEUR"
  | "VIGUEUR_ETEN"
  | "VIGUEUR_NON_ETEN";

type Code = {
  type: "code";
  data: CodeData;
  children: CodeSection[];
};
type CodeData = {
  id: string;
  cid: string;
  title: string;
  etat: State;
  intOrdre: number;
  /** YYYY-MM-DD Date */
  dateModif: string;
  /** YYYY-MM-DD Date */
  dateDebutVersion: string;
  /** YYYY-MM-DD Date */
  dateFinVersion: string;
};

type CodeSection = {
  type: "section";
  data: CodeSectionData;
  children: (CodeArticle | CodeSection)[];
};
type CodeSectionData = {
  id: string;
  cid: string;
  title: string;
  etat: State;
  intOrdre: number;
  /** ??? date (YYYY-MM-DD) */
  dateDebut: string;
  /** ??? date (YYYY-MM-DD) */
  dateFin: string;
};

type CodeArticle = {
  type: "article";
  data: CodeArticleData;
};
type CodeArticleData = {
  id: string;
  cid: string;
  /** Legal index */
  num?: string;
  /** Plain text content */
  texte: string;
  /** HTML content */
  texteHtml: string;
  etat: State;
  intOrdre: number;
  lienModifications: CodeArticleDataLinkUpdate[];
  articleVersions: CodeArticleDataVersion[];
  nota: string;
  notaHtml: string;
  dateDebut: number;
  dateFin: number;
  dateDebutExtension: number;
  dateFinExtension: number;
};

type CodeArticleDataLinkUpdate = {
  textCid: string;
  textTitle: string;
  linkType:
    | "ABROGATION"
    | "ABROGE"
    | "CREATION"
    | "CREE"
    | "DENONCE"
    | "DENONCIATION"
    | "ELARGISSEMENT"
    | "ELARGIT"
    | "ETEND"
    | "EXTENSION"
    | "MODIFICATION"
    | "MODIFIE"
    | "PEREMPTION"
    | "PERIME";
  linkOrientation: "cible" | "source";
  articleNum: string;
  articleId: string;
  natureText: string;
  /** Publication date (YYYY-MM-DD) */
  datePubliTexte: string;
  /** Signature date (YYYY-MM-DD) */
  dateSignaTexte: string;
  /** ??? date (YYYY-MM-DD) */
  dateDebutCible: string;
};

type CodeArticleDataVersion = {
  id: string;
  etat: State;
  version: string;
  dateDebut: number;
  dateFin: number;
  numero: null;
  ordre: null;
};

type IndexedCode = {
  id: string;
  nature: "CODE";
  titre: string;
  titrefull: string;
  titrefull_s: null;
  etat: State;
  /** ??? date (ISO) */
  date_debut: string;
  /** ??? date (ISO) */
  date_fin: string;
  autorite: null;
  ministere: null;
  num: null;
  num_sequence: number;
  nor: null;
  /** Publication date (ISO) */
  date_publi: string;
  /** ??? date (ISO) */
  date_texte: string;
  /** Last update date (ISO) */
  derniere_modification: string;
  origine_publi: null;
  page_deb_publi: number;
  page_fin_publi: number;
  visas: null;
  signataires: null;
  tp: null;
  nota: null;
  abro: null;
  rect: null;
  dossier: "code_en_vigueur" | "code_non_vigueur";
  cid: string;
  mtime: number;
  texte_id: null;
};
type IndexedArticle = {
  /** Code ID */
  codeId: string;
  /** Article CID */
  articleCid: string;
  /** Article ID */
  articleId: string;
};

type CodeWithParents = {
  type: "code";
  data: CodeData;
  children: CodeSectionWithParent[];
};
type CodeSectionWithParent = {
  type: "section";
  data: CodeSectionData;
  children: (CodeSectionWithParent | CodeArticleWithParent)[];
  parent: CodeWithParents | CodeSectionWithParent;
};
type CodeArticleWithParent = CodeArticle & {
  parent: CodeSectionWithParent;
};

type CodeArticleWithParentSections = CodeArticle & {
  sections: Array<{
    type: "section";
    data: CodeSectionData;
  }>;
};
