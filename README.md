# @socialgouv/legi-data

Internal usage only. extracted with [dila-api-client](https://github.com/SocialGouv/dila-api-client).

Data files are structured with an [univeral syntax-tree](https://github.com/syntax-tree/unist) structure.

## Usage

use [dila-api-client](https://github.com/SocialGouv/dila-api-client/) under-the-hood. Set environment variables accordingly.

```js
// liste codes
const codes = require("@socialgouv/legi-data/data/index.json");

// code particulier
const codeCivil = require("@socialgouv/legi-data/data/LEGITEXT000006070721.json");
```

Or via http directly : https://unpkg.com/@socialgouv/legi-data@1.0.0/data/LEGITEXT000006070721.json

## Dev

```sh
# fetch all codes defined in data/index.json
DEBUG="*" OAUTH_CLIENT_ID=xxx OAUTH_CLIENT_SECRET=yyy yarn run fetch

# print list of codes and last updates (for the readme)
DEBUG="*" OAUTH_CLIENT_ID=xxx OAUTH_CLIENT_SECRET=yyy yarn run list
```

## References

| id                   | title                                                                                                         | date_publi |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| LEGITEXT000006070721 | Code civil                                                                                                    | 21/07/2019 |
| LEGITEXT000005634379 | Code de commerce                                                                                              | 01/08/2019 |
| LEGITEXT000006074232 | Code de déontologie des architectes                                                                           | 23/09/1992 |
| LEGITEXT000006070933 | Code de justice administrative                                                                                | 29/07/2019 |
| LEGITEXT000006071360 | Code de justice militaire.                                                                                    | 01/03/2017 |
| LEGITEXT000006069565 | Code de la consommation                                                                                       | 19/07/2019 |
| LEGITEXT000006074096 | Code de la construction et de l'habitation.                                                                   | 29/07/2019 |
| LEGITEXT000006074069 | Code de l'action sociale et des familles                                                                      | 12/07/2019 |
| LEGITEXT000006071307 | Code de la défense.                                                                                           | 01/08/2019 |
| LEGITEXT000006072637 | Code de la famille et de l'aide sociale.                                                                      | 17/07/2015 |
| LEGITEXT000037673300 | Code de la légion d'honneur, de la Médaille militaire et de l'ordre national du Mérite                        | 01/12/2018 |
| LEGITEXT000006074067 | Code de la mutualité                                                                                          | 05/07/2019 |
| LEGITEXT000006069414 | Code de la propriété intellectuelle                                                                           | 01/06/2019 |
| LEGITEXT000006071190 | Code de la recherche                                                                                          | 01/06/2019 |
| LEGITEXT000006074228 | Code de la route.                                                                                             | 27/07/2019 |
| LEGITEXT000006075116 | Code de l'artisanat                                                                                           | 24/05/2019 |
| LEGITEXT000006072665 | Code de la santé publique                                                                                     | 31/07/2019 |
| LEGITEXT000025503132 | Code de la sécurité intérieure                                                                                | 27/07/2019 |
| LEGITEXT000006073189 | Code de la sécurité sociale.                                                                                  | 17/07/2019 |
| LEGITEXT000006074234 | Code de l'aviation civile                                                                                     | 08/07/2019 |
| LEGITEXT000006070667 | Code de la voirie routière                                                                                    | 01/04/2019 |
| LEGITEXT000006071191 | Code de l'éducation                                                                                           | 27/07/2019 |
| LEGITEXT000023983208 | Code de l'énergie                                                                                             | 01/08/2019 |
| LEGITEXT000006070158 | Code de l'entrée et du séjour des étrangers et du droit d'asile.                                              | 01/06/2019 |
| LEGITEXT000006074220 | Code de l'environnement                                                                                       | 27/07/2019 |
| LEGITEXT000006074224 | Code de l'expropriation pour cause d'utilité publique                                                         | 25/11/2018 |
| LEGITEXT000006071164 | Code de l'organisation judiciaire                                                                             | 01/07/2019 |
| LEGITEXT000006074075 | Code de l'urbanisme                                                                                           | 29/07/2019 |
| LEGITEXT000006070716 | Code de procédure civile                                                                                      | 25/07/2019 |
| LEGITEXT000006071154 | Code de procédure pénale                                                                                      | 27/07/2019 |
| LEGITEXT000006073984 | Code des assurances                                                                                           | 05/07/2019 |
| LEGITEXT000006070162 | Code des communes                                                                                             | 01/01/2017 |
| LEGITEXT000006070300 | Code des communes de la Nouvelle-Calédonie                                                                    | 15/07/2018 |
| LEGITEXT000006071570 | Code des douanes                                                                                              | 01/07/2019 |
| LEGITEXT000006071645 | Code des douanes de Mayotte                                                                                   | 01/01/2017 |
| LEGITEXT000006070666 | Code des instruments monétaires et des médailles                                                              | 14/05/2009 |
| LEGITEXT000006070249 | Code des juridictions financières                                                                             | 07/07/2019 |
| LEGITEXT000006070302 | Code des pensions civiles et militaires de retraite                                                           | 16/12/2018 |
| LEGITEXT000006074066 | Code des pensions de retraite des marins français du commerce, de pêche ou de plaisance                       | 01/01/2018 |
| LEGITEXT000031712069 | Code des pensions militaires d'invalidité et des victimes de guerre.                                          | 25/02/2019 |
| LEGITEXT000006074233 | Code des ports maritimes                                                                                      | 15/08/2016 |
| LEGITEXT000006070987 | Code des postes et des communications électroniques                                                           | 30/06/2019 |
| LEGITEXT000025024948 | Code des procédures civiles d'exécution                                                                       | 01/06/2019 |
| LEGITEXT000031366350 | Code des relations entre le public et l'administration                                                        | 01/03/2019 |
| LEGITEXT000023086525 | Code des transports                                                                                           | 26/07/2019 |
| LEGITEXT000006071188 | Code disciplinaire et pénal de la marine marchande.                                                           | 01/01/2018 |
| LEGITEXT000020908868 | Code du cinéma et de l'image animée                                                                           | 11/07/2019 |
| LEGITEXT000006070208 | Code du domaine de l'Etat                                                                                     | 01/11/2018 |
| LEGITEXT000006074235 | Code du domaine de l'Etat et des collectivités publiques applicable à la collectivité territoriale de Mayotte | 25/11/2011 |
| LEGITEXT000006074237 | Code du domaine public fluvial et de la navigation intérieure                                                 | 28/05/2014 |
| LEGITEXT000006074236 | Code du patrimoine                                                                                            | 01/07/2019 |
| LEGITEXT000006071335 | Code du service national                                                                                      | 24/05/2019 |
| LEGITEXT000006071318 | Code du sport.                                                                                                | 07/07/2019 |
| LEGITEXT000006074073 | Code du tourisme.                                                                                             | 12/07/2019 |
| LEGITEXT000006072050 | Code du travail                                                                                               | 08/07/2019 |
| LEGITEXT000006072052 | Code du travail applicable à Mayotte.                                                                         | 07/11/2018 |
| LEGITEXT000006072051 | Code du travail maritime                                                                                      | 20/12/2016 |
| LEGITEXT000006070239 | Code électoral                                                                                                | 07/07/2019 |
| LEGITEXT000025244092 | Code forestier (nouveau)                                                                                      | 27/07/2019 |
| LEGITEXT000006070299 | Code général de la propriété des personnes publiques.                                                         | 29/07/2019 |
| LEGITEXT000006070633 | Code général des collectivités territoriales                                                                  | 24/07/2019 |
| LEGITEXT000006069568 | Code général des impôts annexe 1, CGIAN1.                                                                     | 01/07/2017 |
| LEGITEXT000006069569 | Code général des impôts, annexe 2, CGIAN2.                                                                    | 29/06/2019 |
| LEGITEXT000006069574 | Code général des impôts, annexe 3, CGIAN3.                                                                    | 01/07/2019 |
| LEGITEXT000006069576 | Code général des impôts, annexe 4, CGIAN4.                                                                    | 01/07/2019 |
| LEGITEXT000006069577 | Code général des impôts, CGI.                                                                                 | 26/07/2019 |
| LEGITEXT000006071785 | Code minier                                                                                                   | 02/03/2017 |
| LEGITEXT000023501962 | Code minier (nouveau)                                                                                         | 27/07/2019 |
| LEGITEXT000006072026 | Code monétaire et financier                                                                                   | 19/07/2019 |
| LEGITEXT000006070719 | Code pénal                                                                                                    | 01/06/2019 |
| LEGITEXT000006071366 | Code rural ancien                                                                                             | 01/01/2013 |
| LEGITEXT000022197698 | Code rural et de la pêche maritime                                                                            | 27/07/2019 |
| LEGITEXT000006069583 | Livre des procédures fiscales                                                                                 | 26/07/2019 |
