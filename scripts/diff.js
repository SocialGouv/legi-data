const selectAll = require("unist-util-select").selectAll;
const diff = require("diff");

// extract some version history
// git show SHA:./path/to/SHA.json

// make legifrance url
const makeUrl = (code, id) =>
  `https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${id}&cidTexte=${code}`;

// return diffed nodes
const compare = (tree1, tree2) => {
  // all articles from tree1
  const articles1 = selectAll("article", tree1);
  // all articles from tree2
  const articles2 = selectAll("article", tree2);
  // articles in tree2 not in tree1
  const newArticles = articles2.filter(
    art => !articles1.find(art2 => art2.data.cid === art.data.cid)
  );
  // articles in tree1 not in tree2
  const missingArticles = articles1.filter(
    art => !articles2.find(art2 => art2.data.cid === art.data.cid)
  );
  // articles with modified content
  const modifiedArticles = articles2.filter(
    art =>
      // exclude not found articles
      !newArticles.filter(art2 => art2.data.cid === art.data.cid).length &&
      articles1.find(
        // same article, different text content
        art2 =>
          art2.data.cid === art.data.cid && art2.data.texte !== art.data.texte
      )
  );

  return {
    newArticles,
    missingArticles,
    modifiedArticles: modifiedArticles.map(modif => ({
      ...modif,
      before: articles1.find(a => a.data.cid === modif.data.cid)
    }))
  };
};

// markdown friendly diff output
const markdownDiff = (before, after) =>
  diff
    .diffWords(before, after)
    .map(diff => {
      if (diff.removed) {
        return `<del class="blob-code-delete">${diff.value}</del>`;
      } else if (diff.added) {
        return `<ins class="blob-code-addition">${diff.value}</ins>`;
      }
      return diff.value;
    })
    .join("");

// markdown diffs report
const toMarkdown = (
  codeId,
  { newArticles, missingArticles, modifiedArticles }
) => {
  let markdown = `<style>ins{background:#d0ff9a;} del{background:#ffbaba;}</style>\n\n`;

  markdown += `## Nouveaux articles (${newArticles.length})\n\n`;
  markdown += "cid|num|etat\n";
  markdown += "---|---|----\n";
  newArticles.forEach(art => {
    markdown += `${art.data.cid} | [${art.data.num}](${makeUrl(
      codeId,
      art.data.cid
    )}) | ${art.data.etat}\n`;
  });
  markdown += "\n\n";

  markdown += `## Articles supprimés (${missingArticles.length})\n\n`;
  markdown += "cid|num|etat\n";
  markdown += "---|---|----\n";
  missingArticles.forEach(art => {
    markdown += `${art.data.cid} | [${art.data.num}](${makeUrl(
      codeId,
      art.data.cid
    )}) | ${art.data.etat}\n`;
  });
  markdown += "\n\n";

  markdown += `## Articles modifiés (${modifiedArticles.length})\n\n`;
  modifiedArticles.forEach(art => {
    markdown += `### ${art.data.cid} - [${art.data.num}](${makeUrl(
      codeId,
      art.data.cid
    )})\n\n`;
    if (art.before.data.texte.length > 10000) {
      markdown += "(diff trop long)";
    } else {
      markdown += markdownDiff(art.before.data.texte, art.data.texte);
    }
    markdown += "\n\n";
  });
  markdown += "\n\n";

  return markdown;
};

if (require.main === module) {
  const code1 = require("../legi1.json");
  const code2 = require("../legi2.json");

  const diffs = compare(code1, code2);
  const markdownReport = toMarkdown(code1.data.id, diffs);

  console.log(markdownReport);
}
