// Name: grab-commit-list

import "@johnlindquist/kit"

let commitLink = await arg("enter the commit page url: ")
let selector = await arg("enter selector to ol: ")

let commits = await scrapeSelector(commitLink, selector)

await copy(
    commits[0]
        .split("\n\n")
        .filter((s) => s.includes(":"))
        .reverse()
        .join("\n")
)