import DilaApiClient from "@socialgouv/dila-api-client";

const dilaApi = new DilaApiClient();

// fetch code TOC
export async function getTableMatieres({ date = Date.now(), textId, sctId }) {
  return await dilaApi
    .fetch({
      path: "consult/code/tableMatieres",
      method: "POST",
      params: { textId, date, sctId }
    })
    .then(checkApiResponse);
}

// fetch an article
export async function getArticle(id) {
  return await dilaApi
    .fetch({
      path: "consult/getArticle",
      method: "POST",
      params: { id }
    })
    .then(checkApiResponse);
}

function checkApiResponse(data) {
  if (Object.keys(data).length === 1) {
    throw new Error(`invalid response for ${data.id}`, data);
  }
  return data;
}
