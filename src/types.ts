export namespace LegiData {
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
    | "VIGUEUR_ETEN"
    | "VIGUEUR_NON_ETEN"
    | "VIGUEUR";

  export interface Code {
    type: "code";
    data: CodeData;
    children: CodeSection[];
  }

  interface CodeData {
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
  }

  interface CodeSection {
    type: "section";
    data: CodeSectionData;
    children: (CodeArticle | CodeSection)[];
  }

  interface CodeSectionData {
    id: string;
    cid: string;
    title: string;
    etat: State;
    intOrdre: number;
    /** ??? date (YYYY-MM-DD) */
    dateDebut: string;
    /** ??? date (YYYY-MM-DD) */
    dateFin: string;
  }

  export interface CodeArticle {
    type: "article";
    data: CodeArticleData;
  }

  interface CodeArticleData {
    id: string;
    cid: string;
    /** Legal index */
    num: string;
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
  }

  interface CodeArticleDataLinkUpdate {
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
  }

  interface CodeArticleDataVersion {
    id: string;
    etat: State;
    version: string;
    dateDebut: number;
    dateFin: number;
    numero: null;
    ordre: null;
  }

  export interface IndexedCode {
    id: string;
    nature: string; // TODO Should be nature
    titre: string;
    titrefull: string;
    titrefull_s: null;
    etat: string; // TODO Should be State
    /** ??? date (ISO) */
    date_debut: string;
    /** ??? date (ISO) */
    date_fin: string;
    autorite: null;
    ministere: null;
    num: null;
    num_sequence: number | null;
    nor: null;
    /** Publication date (ISO) */
    date_publi: string;
    /** ??? date (ISO) */
    date_texte: string;
    /** Last update date (ISO) */
    derniere_modification: string;
    origine_publi: null;
    page_deb_publi: number | null;
    page_fin_publi: number | null;
    visas: null;
    signataires: null;
    tp: null;
    nota: string | null;
    abro: null;
    rect: null;
    dossier: string; // TODO Should be "code_en_vigueur" | "code_non_vigueur";
    cid: string;
    mtime: number;
    texte_id: null;
  }

  export interface IndexedArticle {
    /** Code ID */
    codeId: string;
    /** Article CID */
    articleCid: string;
    /** Article ID */
    articleId: string;
  }

  export interface CodeWithParents {
    type: "code";
    data: CodeData;
    children: CodeSectionWithParent[];
  }

  interface CodeSectionWithParent {
    type: "section";
    data: CodeSectionData;
    children: (CodeArticleWithParent | CodeSectionWithParent)[];
    parent: CodeSectionWithParent | CodeWithParents;
  }

  type CodeArticleWithParent = CodeArticle & {
    parent: CodeSectionWithParent;
  };

  export type CodeArticleWithParentSections = CodeArticle & {
    sections: {
      type: "section";
      data: CodeSectionData;
    }[];
  };
}

export interface PromiseJson<T> {
  default: T;
}
