import INDEXED_ARTICLES from "../../data/articles/index.json";
import { LegiData } from "../types";

/**
 * Get the full list of indexed articles.
 */
function getIndexedArticles(): LegiData.IndexedArticle[] {
  return INDEXED_ARTICLES;
}

export default getIndexedArticles;
