import DilaApiClient from "@socialgouv/dila-api-client";

const dilaApi = new DilaApiClient();

// fetch code TOC
export async function getTableMatieres({ date = Date.now(), textId, sctId }) {
  return await dilaApi
    .fetch({
      method: "POST",
      params: { date, sctId, textId, nature: "CODE" },
      path: "consult/legi/tableMatieres",
    })
    .then(checkApiResponse);
}

// fetch an article
export async function getArticle(id) {
  return await dilaApi
    .fetch({
      method: "POST",
      params: { id },
      path: "consult/getArticle",
    })
    .then(checkApiResponse);
}

function checkApiResponse(data) {
  if (Object.keys(data).length === 1) {
    throw new Error(`invalid response for ${data.id}`, data);
  }

  return data;
}
