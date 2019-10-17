# @socialgouv/legi-data

Internal usage only. extracted with [dila-api-client](https://github.com/SocialGouv/dila-api-client).

Data files are structured with an [univeral syntax-tree](https://github.com/syntax-tree/unist) structure.

## Usage

use [dila-api-client](https://github.com/SocialGouv/dila-api-client/) under-the-hood. Set environment variables accordingly.

```js
// liste codes
const codes = require("@socialgouv/legi-data/data/index.json");

// code particulier
const codeDuTravail = require("@socialgouv/legi-data/data/LEGITEXT000006072050.json");
```

Or via http directly : https://unpkg.com/@socialgouv/legi-data@1.0.0/data/LEGITEXT000006072050.json

## Dev

```sh
# fetch all codes defined in data/index.json
DEBUG="*" OAUTH_CLIENT_ID=xxx OAUTH_CLIENT_SECRET=yyy yarn run fetch

# print list of codes and last updates (for the readme)
DEBUG="*" OAUTH_CLIENT_ID=xxx OAUTH_CLIENT_SECRET=yyy yarn run list
```

## References

| id                   | title                                                  | date_publi |
| -------------------- | ------------------------------------------------------ | ---------- |
| LEGITEXT000031366350 | Code des relations entre le public et l'administration | 01/03/2019 |
| LEGITEXT000006072050 | Code du travail                                        | 14/10/2019 |
| LEGITEXT000022197698 | Code rural et de la pêche maritime                     | 13/10/2019 |
