import { DilaApiClient } from "@socialgouv/dila-api-client";
import * as fs from "fs";

import type { Document, TableMatieres } from "../types";

const dilaApi = new DilaApiClient();

// fetch code TOC
export async function getTableMatieres({ date = Date.now(), textId }): Promise<TableMatieres> {
  const result: TableMatieres = await dilaApi.fetch({
    method: "POST",
    params: { date, textId },
    path: "consult/code/tableMatieres",
  });
  checkApiResponse(result);
  fs.writeFileSync(`toc_${textId}.json`, JSON.stringify(result, null, 2));
  return result;
}

// fetch an article
export async function getArticle(id) {
  const result = await dilaApi.fetch({
    method: "POST",
    params: { id },
    path: "consult/getArticle",
  });
  fs.writeFileSync(`article_${id}.json`, JSON.stringify(result, null, 2));
  checkApiResponse(result);
  return result;
}

function checkApiResponse<T extends Document>(data: T): T {
  if (Object.keys(data).length === 1) {
    throw new Error(`invalid response for ${data.id} ${JSON.stringify(data, null, 2)}`);
  }

  return data;
}
