import fs from "fs";
import prompt from "prompt";

const SCHEMA = {
  properties: {
    oauthClientId: {
      description: "Identifiants Oauth » Client ID ?",
      required: true,
    },
    oauthClientSecret: {
      description: "Identifiants Oauth » Client Secret ?",
      required: true,
    },
  },
};

prompt.delimiter = "\n>";
prompt.message = "";
prompt.start();
prompt.get(SCHEMA, function (err, result) {
  const source = [
    `API_HOST=https://api.aife.economie.gouv.fr/dila/legifrance-beta/lf-engine-app`,
    `OAUTH_CLIENT_ID=${result.oauthClientId.trim()}`,
    `OAUTH_CLIENT_SECRET=${result.oauthClientSecret.trim()}`,
    `TOKEN_HOST=https://oauth.aife.economie.gouv.fr`,
    ``,
  ].join("\n");

  fs.writeFileSync(".env", source);
});
