// .kenv/kenvs/egghead/scripts/grab-commit-list.ts
import "@johnlindquist/kit";
var commitLink = await arg("enter the commit page url: ");
var selector = await arg("enter selector to ol: ");
var commits = await scrapeSelector(commitLink, selector);
await copy(
  commits[0].split("\n\n").filter((s) => s.includes(":")).reverse().join("\n")
);
