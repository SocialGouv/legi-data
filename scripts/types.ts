type State =
  | "ABROGE"
  | "DENONCE"
  | "MODIFIE"
  | "PERIME"
  | "REMPLACE"
  | "VIGUEUR_ETEN"
  | "VIGUEUR_NON_ETEN"
  | "VIGUEUR";

export type Document = {
  id: string;
};

export type TocApiResult = Document & {
  cid: string;
  executionTime: number;
  dereferenced: boolean;
  idConteneur: unknown | null;
  title: string;
  nor: unknown | null;
  eli: unknown | null;
  alias: unknown | null;
  jorfText: unknown | null;
  jurisState: "Vigueur";
  visa: unknown | null;
  // Format: YYYY-MM-DD
  modifDate: string;
  // Format: YYYY-MM-DD
  jurisDate: string;
  // Format: YYYY-MM-DD
  dateDebutVersion: string;
  // Format: YYYY-MM-DD
  dateFinVersion: string;
  signers: unknown | null;
  prepWork: unknown | null;
  dateParution: number;
  numParution: number | null;
  notice: unknown | null;
  nota: unknown | null;
  inap: unknown | null;
  textNumber: unknown | null;
  textAbroge: boolean;
  etat: State;
  dossiersLegislatifs: unknown[];
  nature: "CODE";
  resume: unknown | null;
  rectificatif: unknown | null;
  motsCles: unknown[];
  liens: unknown[];
  observations: unknown | null;
  sections: TocSection[] | null;
  articles: TocArticle[] | null;
  fileName: string;
  fileSize: string;
  filePath: string;
};

export type TocSection = Document & {
  cid: string;
  executionTime: number;
  dereferenced: boolean;
  intOrdre: number;
  etat: State;
  title: string;
  dateModif: unknown | null;
  // Format: YYYY-MM-DD
  dateDebut: string;
  // Format: YYYY-MM-DD
  dateFin: string;
  sectionConsultee: boolean;
  sections: TocSection[] | null;
  articles: TocArticle[] | null;
  commentaire: string | null;
};

export type TocArticle = Document & {
  cid: string;
  executionTime: number;
  dereferenced: boolean;
  intOrdre: number;
  etat: "VIGUEUR";
  num: string;
  path: unknown | null;
  pathTitle: unknown | null;
  content: unknown | null;
  nota: unknown | null;
  comporteLiens: boolean;
  modificatorTitle: unknown | null;
  modificatorCid: unknown | null;
  modificatorDate: unknown | null;
  articleVersion: unknown | null;
  type: unknown | null;
  lstLienModification: unknown[];
  lstLienCitation: unknown[];
  conditionDiffere: unknown | null;
  historique: unknown | null;
  surtitre: unknown | null;
  renvoi: unknown | null;
  versionLabel: unknown | null;
};

export interface ArticleApiResult {
  executionTime: number;
  dereferenced: boolean;
  article: Article;
}
export type Article = Document & {
  idTexte?: unknown | null;
  type: string;
  texte: string;
  texteHtml: string;
  num: string;
  origine: string;
  nature: string;
  versionArticle: string;
  etat: string;
  dateDebut: number;
  dateFin: number;
  dateDebutExtension: number;
  dateFinExtension: number;
  inap?: unknown | null;
  ordre: number;
  context: unknown;
  cid: string;
  cidTexte?: unknown | null;
  sectionParentCid: string;
  sectionParentId: string;
  sectionParentTitre: string;
  fullSectionsTitre: string;
  refInjection: string;
  idTechInjection: string;
  idEli?: unknown | null;
  idEliAlias?: unknown | null;
  calipsos?: unknown[] | null;
  textTitles?: TextTitlesEntity[] | null;
  nota: string;
  notaHtml: string;
  activitePro?: unknown[] | null;
  numeroBrochure?: unknown[] | null;
  numeroBo?: unknown | null;
  conteneurs?: unknown[] | null;
  lienModifications?: LienModificationsEntity[] | null;
  lienCitations?: LienCitationsEntity[] | null;
  lienConcordes?: LienConcordesEntityOrLienAutresEntity[] | null;
  lienAutres?: LienConcordesEntityOrLienAutresEntity[] | null;
  articleVersions?: ArticleVersionsEntity[] | null;
  computedNums?: string[] | null;
  versionPrecedente: string;
  conditionDiffere?: unknown | null;
  historique?: unknown | null;
  surtitre?: unknown | null;
  renvoi?: unknown | null;
};

export interface TextTitlesEntity {
  id: string;
  titre: string;
  titreLong: string;
  etat: string;
  dateDebut: number;
  dateFin: number;
  cid: string;
  datePubli: number;
  datePubliComputed?: unknown | null;
  dateTexte: number;
  dateTexteComputed?: unknown | null;
  nature: string;
  nor: string;
  num: string;
  numParution: string;
  originePubli: string;
  appliGeo?: unknown | null;
  codesNomenclatures?: unknown[] | null;
  visas?: unknown | null;
  nota?: unknown | null;
  notice?: unknown | null;
  travauxPreparatoires?: unknown | null;
  signataires?: unknown | null;
  dossiersLegislatifs?: unknown[] | null;
  ancienId?: unknown | null;
}
export interface LienModificationsEntity {
  textCid: string;
  textTitle: string;
  linkType: string;
  linkOrientation: string;
  articleNum: string;
  articleId: string;
  natureText: string;
  datePubliTexte: string;
  dateSignaTexte: string;
  dateDebutCible: string;
}
export interface LienCitationsEntity {
  textCid: string;
  textTitle: string;
  linkType: string;
  linkOrientation: string;
  articleNum: string;
  articleId: string;
  natureText: string;
  date: number;
  parentCid?: unknown | null;
  numTexte: string;
  datePubli: number;
  dateDebut: number;
}
export interface LienConcordesEntityOrLienAutresEntity {
  textCid: string;
  textTitle: string;
  linkType: string;
  linkOrientation: string;
  articleNum: string;
  articleId: string;
  natureText: string;
}
export interface ArticleVersionsEntity {
  id: string;
  etat: string;
  version: string;
  dateDebut: number;
  dateFin: number;
  numero?: unknown | null;
  ordre?: unknown | null;
}
