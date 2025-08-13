# @socialgouv/legi-data

[![License][img-license]][link-license] [![NPM Version][img-npm]][link-npm]
[![Code Coverage][img-coverage]][link-coverage]

---

:warning: Experimental, for internal usage only :warning:

---

Extractions quotidiennes des codes de loi de la
[base LEGI](https://www.data.gouv.fr/fr/datasets/legi-codes-lois-et-reglements-consolides/) depuis
l'API legifrance.gouv.fr

Les données sont disponibles au format JSON ou via une API TypeScript.

ex pour récupérer le "code du travail" complet :

```
const code = require("@socialgouv/legi-data/data/LEGITEXT000006072050.json");
```

La structure du JSON est basée sur [unified](https://unifiedjs.com/)

---

Actuellement, seuls 4 codes sont versionnés ici :

| Id                   | Description                                            |
| -------------------- | ------------------------------------------------------ |
| LEGITEXT000006072050 | Code du travail                                        |
| LEGITEXT000022197698 | Code de la sécurité sociale                            |
| LEGITEXT000022197698 | Code rural et de la pêche maritime                     |
| LEGITEXT000031366350 | Code des relations entre le public et l'administration |

Postez [une issue](https://github.com/SocialGouv/legi-data) si vous souhaitez en voir d'autres.

---

## API TypeScript

### Getting started

```sh
npm i @socialgouv/legi-data

# or if you only need the Typescript types
npm i -D @socialgouv/legi-data-types
```

#### getArticleWithParentSections()

Get a code article [unist][link-unist] node with its parent sections.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
LegiData.CodeArticleWithParentSections;
```

#### getCode()

Get a full code [unist][link-unist] node with its sections and articles.

| Parameter | Type     | Default      | Description |
| --------- | -------- | ------------ | ----------- |
| `codeId`  | `string` | **required** | Code ID     |

**Return Type**

```ts
LegiData.Code;
```

#### getCodeWithParents()

Get a full code [unist][link-unist] node with its sections and articles.<br> Each node has a
`parent` property with a pointer to its parent node.

| Parameter | Type     | Default      | Description |
| --------- | -------- | ------------ | ----------- |
| `codeId`  | `string` | **required** | Code ID     |

**Return Type**

```ts
LegiData.CodeWithParents;
```

#### getIndexedArticle()

Get an indexed articles.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
LegiData.IndexedArticle;
```

#### getIndexedArticles()

Get the full list of indexed articles.

**Return Type**

```ts
LegiData.IndexedArticle[]
```

#### getIndexedCodes()

Get the full list of indexed codes.

**Return Type**

```ts
LegiData.IndexedCode[]
```

#### hasArticle()

Check if an article is available.

| Parameter        | Type     | Default      | Description       |
| ---------------- | -------- | ------------ | ----------------- |
| `articleIdOrCid` | `string` | **required** | Article ID or CID |

**Return Type**

```ts
boolean;
```

#### hasCode()

Check if an code is available.

| Parameter | Type     | Default      | Description |
| --------- | -------- | ------------ | ----------- |
| `codeId`  | `string` | **required** | Code ID     |

**Return Type**

```ts
boolean;
```

## Contributing

### Getting started

First, you'll need to create an application on [PISTE][link-aife-api] and select **DILA - Légifrance
Beta** API.

Then:

```sh
yarn
yarn setup
```

This will automatically prompt and store your OAuth Client ID & Secret.

### Data Generation

`yarn data:update` will automatically fetch, list and match **data** package codes with their
articles.

- `yarn data:fetch`: Update codes articles from DILA API.
- `yarn data:match`: Update codes articles index (matching articles ID & CID with their codes ID).
- `yarn data:list` Update `REFERENCES.md` file.

### Tests

- `yarn test:lint`: Lint codebase.
- `yarn test:type`: Check typings.
- `yarn test:unit` Launch unit tests.
- `yarn test:update` Update unit tests snapshots.
- `yarn test:watch` Launch unit tests in watching mode.

## References

The agreement references list is available [here][link-code-references].

## Also

- [Code du travail numérique](https://github.com/SocialGouv/code-du-travail-numerique)
- [dila-api-client : Client JavaScript pour l'API DILA AIFE](https://github.com/SocialGouv/dila-api-client)
- [kali-data : base conventions collectives KALI](https://github.com/SocialGouv/kali-data)
- [fiches-vdd : Fiches vos droits et démarches](https://github.com/SocialGouv/fiches-vdd)

---

[img-coverage]: https://badgen.net/codecov/c/github/SocialGouv/legi-data?style=flat-square
[img-license]: https://badgen.net/github/license/SocialGouv/legi-data?style=flat-square
[img-npm]: https://badgen.net/npm/v/@socialgouv/legi-data?style=flat-square
[link-coverage]: https://codecov.io/gh/SocialGouv/legi-data
[link-license]: https://github.com/SocialGouv/legi-data/blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/legi-data
[link-code-references]: https://github.com/SocialGouv/legi-data/blob/master/REFERENCES.md
[link-aife-api]: https://piste.gouv.fr/
[link-dila-api-client]: https://github.com/SocialGouv/dila-api-client
[link-typings]: https://github.com/SocialGouv/legi-data/blob/master/src/index.d.ts
[link-unist]: https://github.com/syntax-tree/unist
