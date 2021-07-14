let notesBaseUrl = "https://github.com/eggheadio/eggheadio-course-notes/tree/";

let courseFolder = await arg("Enter a notes course folder (course slug):");
let yesOrNo = [
  { name: "Yes", value: true },
  { name: "No", value: false },
];
let hasNotesFolder = await arg(
  `Does the ${courseFolder} have a notes sub folder?`,
  yesOrNo
);

// Grab links from notes folder
let scrapedNotesFolder = hasNotesFolder
  ? `https://github.com/eggheadio/eggheadio-course-notes/tree/master/${courseFolder}/notes`
  : `https://github.com/eggheadio/eggheadio-course-notes/tree/master/${courseFolder}`;
let links = await scrapeSelector(scrapedNotesFolder, "a", (el) => el.innerText);
let cdnBaseUrl = "https://cdn.jsdelivr.net/gh/eggheadio/eggheadio-course-notes";

// filter down to the markdown links that are present
// assumed to be the notes themselves
let markdownFiles = links.filter(
  (link) => link.includes(".md") && link.toLowerCase() !== "readme.md"
);

// built the cdn links that we need to post
let cdnUrls = markdownFiles.map((slug) => {
  let newSlug = "";
  if (hasNotesFolder) {
    newSlug = `notes/${slug}`;
  } else {
    newSlug = slug;
  }

  return `https://cdn.jsdelivr.net/gh/eggheadio/eggheadio-course-notes/${courseFolder}/${newSlug}`;
});

let liUrls = cdnUrls.map((url) => {
  return `<li class="my-2"><a href=${url} class="hover:text-blue-700 bold">${url}</a></li>`;
});
let markup = `
<div>
  <span>Please check that these urls are correct: </span>
  <ul>
    ${liUrls.map((li) => li)}
  </ul>
</div>
`;
show(`
${markup}
`);
let corrrectUrls = await arg("Are URLs correct?", yesOrNo);

console.log(cdnUrls);

//! look at egghead-asciicast repo for posting to rails
//

let notesURL =
  "https://cdn.jsdelivr.net/gh/eggheadio/eggheadio-course-notes/advanced-sql-for-professional-developers/notes/01-bulk-insert-and-export-files.md";

post(`https://app.egghead.io/api/v1/lessons/`);
