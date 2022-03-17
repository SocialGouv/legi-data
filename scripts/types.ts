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
  cid: string;
};

export type TableMatieres = Document & {
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
  sections: Section[];
  articles: unknown[];
  fileName: string;
  fileSize: string;
  filePath: string;
};

export type Section = Document & {
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
  sections: Section[];
  articles: Article[];
  commentaire: string | null;
};

export type Article = Document & {
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
