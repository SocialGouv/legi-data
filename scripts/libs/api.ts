import { DilaApiClient } from "@socialgouv/dila-api-client";

import type { ArticleApiResult, TocApiResult } from "../types";

const dilaApi = new DilaApiClient();

// fetch code TOC
export async function getTableMatieres(
  textId: string,
  date: number = Date.now(),
): Promise<TocApiResult> {
  const result: TocApiResult = await dilaApi.fetch({
    method: "POST",
    params: { date, textId },
    path: "consult/code/tableMatieres",
  });
  checkApiResponse(textId, result);
  return result;
}

// fetch an article
export async function getArticle(id: string): Promise<ArticleApiResult> {
  const result: ArticleApiResult = await dilaApi.fetch({
    method: "POST",
    params: { id },
    path: "consult/getArticle",
  });
  checkApiResponse(id, result);
  return result;
}

function checkApiResponse<T>(id: string, data: T) {
  if (Object.keys(data).length === 1) {
    throw new Error(`invalid response for ${id} ${JSON.stringify(data, null, 2)}`);
  }
}
