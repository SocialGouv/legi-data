# @socialgouv/legi-data

Internal usage only. extracted with [dila-api-client](https://github.com/SocialGouv/dila-api-client).

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

```
# fetch all codes defined in data/index.json
DEBUG="*" OAUTH_CLIENT_ID=xxx OAUTH_CLIENT_SECRET=yyy yarn run fetch

# print list of codes and last updates (for the readme)
DEBUG="*" OAUTH_CLIENT_ID=xxx OAUTH_CLIENT_SECRET=yyy yarn run list
```

## References

| id                   | title                                                                                                                           | etat         | date_publi |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------- |
| LEGITEXT000006070721 | Code civil                                                                                                                      | VIGUEUR      | 21/07/2019 |
| LEGITEXT000006069441 | Code de commerce                                                                                                                | ABROGE       | 21/09/2000 |
| LEGITEXT000005634379 | Code de commerce                                                                                                                | VIGUEUR      | 01/08/2019 |
| LEGITEXT000006071071 | Code de déontologie de la police nationale                                                                                      | ABROGE       | 01/01/2014 |
| LEGITEXT000006071103 | Code de déontologie de la profession de commissaire aux comptes                                                                 | ABROGE       | 27/03/2007 |
| LEGITEXT000006070159 | Code de déontologie des agents de police municipale.                                                                            | ABROGE       | 01/01/2014 |
| LEGITEXT000006074232 | Code de déontologie des architectes                                                                                             | VIGUEUR      | 23/09/1992 |
| LEGITEXT000006072636 | Code de déontologie des chirurgiens-dentistes                                                                                   | ABROGE       | 08/08/2004 |
| LEGITEXT000006072664 | Code de déontologie des médecins                                                                                                | ABROGE       | 08/09/1995 |
| LEGITEXT000006074510 | Code de déontologie des professionnels de l'expertise comptable                                                                 | ABROGE       | 01/04/2012 |
| LEGITEXT000006072635 | Code de déontologie des sages-femmes                                                                                            | ABROGE       | 08/08/2004 |
| LEGITEXT000006072634 | Code de déontologie médicale                                                                                                    | ABROGE       | 08/08/2004 |
| LEGITEXT000006072360 | Code de déontologie vétérinaire                                                                                                 | ABROGE       | 07/08/2003 |
| LEGITEXT000006070933 | Code de justice administrative                                                                                                  | VIGUEUR      | 29/07/2019 |
| LEGITEXT000006070884 | Code de justice militaire                                                                                                       | ABROGE       | 12/05/2007 |
| LEGITEXT000006071360 | Code de justice militaire.                                                                                                      | VIGUEUR      | 01/03/2017 |
| LEGITEXT000037701019 | Code de la commande publique                                                                                                    | VIGUEUR_DIFF | 22/07/2019 |
| LEGITEXT000006069565 | Code de la consommation                                                                                                         | VIGUEUR      | 19/07/2019 |
| LEGITEXT000006069472 | Code de la consommation des boissons et des mesures contre l'alcoolisme applicable dans la collectivité territoriale de Mayotte | ABROGE       | 22/06/2000 |
| LEGITEXT000006074096 | Code de la construction et de l'habitation.                                                                                     | VIGUEUR      | 29/07/2019 |
| LEGITEXT000006074069 | Code de l'action sociale et des familles                                                                                        | VIGUEUR      | 12/07/2019 |
| LEGITEXT000006071307 | Code de la défense.                                                                                                             | VIGUEUR      | 01/08/2019 |
| LEGITEXT000006072637 | Code de la famille et de l'aide sociale.                                                                                        | VIGUEUR      | 17/07/2015 |
| LEGITEXT000037673300 | Code de la légion d'honneur, de la Médaille militaire et de l'ordre national du Mérite                                          | VIGUEUR      | 01/12/2018 |
| LEGITEXT000006071007 | Code de la Légion d'honneur et de la médaille militaire                                                                         | MODIFIE      | 01/12/2018 |
| LEGITEXT000006074067 | Code de la mutualité                                                                                                            | VIGUEUR      | 05/07/2019 |
| LEGITEXT000006071189 | Code de la nationalité française                                                                                                | ABROGE       | 01/01/1994 |
| LEGITEXT000006069414 | Code de la propriété intellectuelle                                                                                             | VIGUEUR      | 01/06/2019 |
| LEGITEXT000006071190 | Code de la recherche                                                                                                            | VIGUEUR      | 01/06/2019 |
| LEGITEXT000006074947 | Code de la route                                                                                                                | ABROGE       | 01/06/2001 |
| LEGITEXT000006074228 | Code de la route.                                                                                                               | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006075116 | Code de l'artisanat                                                                                                             | VIGUEUR      | 24/05/2019 |
| LEGITEXT000006072665 | Code de la santé publique                                                                                                       | VIGUEUR      | 31/07/2019 |
| LEGITEXT000025503132 | Code de la sécurité intérieure                                                                                                  | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006073189 | Code de la sécurité sociale.                                                                                                    | VIGUEUR      | 17/07/2019 |
| LEGITEXT000006074234 | Code de l'aviation civile                                                                                                       | VIGUEUR      | 08/07/2019 |
| LEGITEXT000006070667 | Code de la voirie routière                                                                                                      | VIGUEUR      | 01/04/2019 |
| LEGITEXT000006071191 | Code de l'éducation                                                                                                             | VIGUEUR      | 27/07/2019 |
| LEGITEXT000023983208 | Code de l'énergie                                                                                                               | VIGUEUR      | 01/08/2019 |
| LEGITEXT000006071014 | Code de l'enseignement technique                                                                                                | ABROGE       | 22/06/2000 |
| LEGITEXT000006070158 | Code de l'entrée et du séjour des étrangers et du droit d'asile.                                                                | VIGUEUR      | 01/06/2019 |
| LEGITEXT000006074220 | Code de l'environnement                                                                                                         | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006074224 | Code de l'expropriation pour cause d'utilité publique                                                                           | VIGUEUR      | 25/11/2018 |
| LEGITEXT000006070882 | Code de l'industrie cinématographique                                                                                           | ABROGE       | 14/06/2010 |
| LEGITEXT000006071737 | Code de l'Office national interprofessionnel du blé                                                                             | ABROGE       | 06/09/2003 |
| LEGITEXT000006071164 | Code de l'organisation judiciaire                                                                                               | VIGUEUR      | 01/07/2019 |
| LEGITEXT000006074075 | Code de l'urbanisme                                                                                                             | VIGUEUR      | 29/07/2019 |
| LEGITEXT000006070716 | Code de procédure civile                                                                                                        | VIGUEUR      | 25/07/2019 |
| LEGITEXT000006070680 | Code de procédure civile (1807)                                                                                                 | ABROGE       | 22/12/2007 |
| LEGITEXT000006071154 | Code de procédure pénale                                                                                                        | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006073984 | Code des assurances                                                                                                             | VIGUEUR      | 05/07/2019 |
| LEGITEXT000006073422 | Code des caisses d'épargne                                                                                                      | ABROGE       | 25/08/2005 |
| LEGITEXT000006070162 | Code des communes                                                                                                               | VIGUEUR      | 01/01/2017 |
| LEGITEXT000006070300 | Code des communes de la Nouvelle-Calédonie                                                                                      | VIGUEUR      | 15/07/2018 |
| LEGITEXT000006075115 | Code des débits de boissons et des mesures contre l'alcoolisme                                                                  | ABROGE       | 27/05/2003 |
| LEGITEXT000006071570 | Code des douanes                                                                                                                | VIGUEUR      | 01/07/2019 |
| LEGITEXT000006071645 | Code des douanes de Mayotte                                                                                                     | VIGUEUR      | 01/01/2017 |
| LEGITEXT000006070666 | Code des instruments monétaires et des médailles                                                                                | VIGUEUR      | 14/05/2009 |
| LEGITEXT000006070249 | Code des juridictions financières                                                                                               | VIGUEUR      | 07/07/2019 |
| LEGITEXT000006069564 | Code des marchés publics                                                                                                        | ABROGE       | 01/06/2004 |
| LEGITEXT000005627819 | Code des marchés publics                                                                                                        | ABROGE       | 01/04/2016 |
| LEGITEXT000006069562 | Code des marchés publics                                                                                                        | ABROGE       | 01/01/2002 |
| LEGITEXT000006072666 | Code des marchés publics.                                                                                                       | ABROGE       | 01/09/2006 |
| LEGITEXT000006070302 | Code des pensions civiles et militaires de retraite                                                                             | VIGUEUR      | 16/12/2018 |
| LEGITEXT000006074066 | Code des pensions de retraite des marins français du commerce, de pêche ou de plaisance                                         | VIGUEUR      | 01/01/2018 |
| LEGITEXT000031712069 | Code des pensions militaires d'invalidité et des victimes de guerre.                                                            | VIGUEUR      | 25/02/2019 |
| LEGITEXT000006074068 | Code des pensions militaires d'invalidité et des victimes de la guerre.                                                         | MODIFIE      | 25/02/2019 |
| LEGITEXT000006074233 | Code des ports maritimes                                                                                                        | VIGUEUR      | 15/08/2016 |
| LEGITEXT000006070987 | Code des postes et des communications électroniques                                                                             | VIGUEUR      | 30/06/2019 |
| LEGITEXT000025024948 | Code des procédures civiles d'exécution                                                                                         | VIGUEUR      | 01/06/2019 |
| LEGITEXT000031366350 | Code des relations entre le public et l'administration                                                                          | VIGUEUR      | 01/03/2019 |
| LEGITEXT000023086525 | Code des transports                                                                                                             | VIGUEUR      | 26/07/2019 |
| LEGITEXT000006071344 | Code des tribunaux administratifs et des cours administratives d'appel                                                          | ABROGE       | 01/01/2001 |
| LEGITEXT000006071188 | Code disciplinaire et pénal de la marine marchande.                                                                             | VIGUEUR      | 01/01/2018 |
| LEGITEXT000006071646 | Code du blé                                                                                                                     | ABROGE       | 26/05/2006 |
| LEGITEXT000020908868 | Code du cinéma et de l'image animée                                                                                             | VIGUEUR      | 11/07/2019 |
| LEGITEXT000006070208 | Code du domaine de l'Etat                                                                                                       | VIGUEUR      | 01/11/2018 |
| LEGITEXT000006074235 | Code du domaine de l'Etat et des collectivités publiques applicable à la collectivité territoriale de Mayotte                   | VIGUEUR      | 25/11/2011 |
| LEGITEXT000006074237 | Code du domaine public fluvial et de la navigation intérieure                                                                   | VIGUEUR      | 28/05/2014 |
| LEGITEXT000006074236 | Code du patrimoine                                                                                                              | VIGUEUR      | 01/07/2019 |
| LEGITEXT000006071335 | Code du service national                                                                                                        | VIGUEUR      | 24/05/2019 |
| LEGITEXT000006071318 | Code du sport.                                                                                                                  | VIGUEUR      | 07/07/2019 |
| LEGITEXT000006074073 | Code du tourisme.                                                                                                               | VIGUEUR      | 12/07/2019 |
| LEGITEXT000006072050 | Code du travail                                                                                                                 | VIGUEUR      | 08/07/2019 |
| LEGITEXT000006072052 | Code du travail applicable à Mayotte.                                                                                           | VIGUEUR      | 07/11/2018 |
| LEGITEXT000006072051 | Code du travail maritime                                                                                                        | VIGUEUR      | 20/12/2016 |
| LEGITEXT000006071657 | Code du vin                                                                                                                     | ABROGE       | 06/09/2003 |
| LEGITEXT000006070239 | Code électoral                                                                                                                  | VIGUEUR      | 07/07/2019 |
| LEGITEXT000006071514 | Code forestier                                                                                                                  | ABROGE       | 01/07/2012 |
| LEGITEXT000006071556 | Code forestier de Mayotte                                                                                                       | ABROGE       | 01/01/2016 |
| LEGITEXT000025244092 | Code forestier (nouveau)                                                                                                        | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006070299 | Code général de la propriété des personnes publiques.                                                                           | VIGUEUR      | 29/07/2019 |
| LEGITEXT000006070633 | Code général des collectivités territoriales                                                                                    | VIGUEUR      | 24/07/2019 |
| LEGITEXT000006069568 | Code général des impôts annexe 1, CGIAN1.                                                                                       | VIGUEUR      | 01/07/2017 |
| LEGITEXT000006069569 | Code général des impôts, annexe 2, CGIAN2.                                                                                      | VIGUEUR      | 29/06/2019 |
| LEGITEXT000006069574 | Code général des impôts, annexe 3, CGIAN3.                                                                                      | VIGUEUR      | 01/07/2019 |
| LEGITEXT000006069576 | Code général des impôts, annexe 4, CGIAN4.                                                                                      | VIGUEUR      | 01/07/2019 |
| LEGITEXT000006069577 | Code général des impôts, CGI.                                                                                                   | VIGUEUR      | 26/07/2019 |
| LEGITEXT000006071785 | Code minier                                                                                                                     | VIGUEUR      | 02/03/2017 |
| LEGITEXT000023501962 | Code minier (nouveau)                                                                                                           | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006072026 | Code monétaire et financier                                                                                                     | VIGUEUR      | 19/07/2019 |
| LEGITEXT000006071029 | CODE PENAL                                                                                                                      | ABROGE       | 01/03/1994 |
| LEGITEXT000006070719 | Code pénal                                                                                                                      | VIGUEUR      | 01/06/2019 |
| LEGITEXT000006071367 | Code rural                                                                                                                      | MODIFIE      | 27/07/2019 |
| LEGITEXT000006071366 | Code rural ancien                                                                                                               | VIGUEUR      | 01/01/2013 |
| LEGITEXT000022197698 | Code rural et de la pêche maritime                                                                                              | VIGUEUR      | 27/07/2019 |
| LEGITEXT000006069583 | Livre des procédures fiscales                                                                                                   | VIGUEUR      | 26/07/2019 |
