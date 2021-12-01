// Menu: egghead.io
// Description: Browse egghead.io's lesson library
// Shortcut: option e
// Author: egghead.io
// Twitter: @eggheadio

/** @type {import("@johnlindquist/kit")} */

let algoliasearch = await npm("algoliasearch");
let app = await env("EGGHEAD_PUBLIC_ALGOLIA_APP");
let key = await env("EGGHEAD_PUBLIC_ALGOLIA_KEY");
let client = algoliasearch(app, key);

let index = client.initIndex("content_production");

let lessons = [];

let hit = await arg(
  {
    placeholder: "Search egghead:",
    ignoreBlur: true,
    input: "react",
  },
  async (input) => {
    if (input) {
      let { hits } = await index.search(input);

      return (hits || []).map((hit) => {
        return {
          name: hit.title,
          value: hit,
          // tag: '', // TODO: tag could be number of lessons, but it's not available here
          img: hit.image,
          description: hit.instructor_name,
          preview: async () => {
            if (!hit?.slug) return `Result slug not found`;
            let response = await fetch(
              `https://app.egghead.io/api/v1/playlists/${hit.slug}/items?flatten=true`
            );

            lessons = await response.json();
            if (!Array.isArray(lessons)) lessons = [];
            if (lessons?.length) {
              setFlags({
                instructor: {
                  name: "View instructor profile",
                  description: "Open the instructor profile in your browser",
                  shortcut: "cmd+i",
                  url: `https://egghead.io/${hit.instructor_path}`,
                },
                twitter: {
                  name: "View instructor's twitter",
                  description: "Open the instructor twitter account",
                  shortcut: "cmd+t",
                  url: `https://twitter.com/${hit.instructor.twitter}`,
                },
                website: {
                  name: "View instructor's website",
                  description: "Open the instructor website",
                  shortcut: "cmd+w",
                },
                ...lessons?.map((lesson, i) => ({
                  name: `${i + 1}: ${lesson.title}`,
                  description: convertTimeWithTitles(lesson.duration),
                  shortcut: `cmd+${i + 1}`,
                })),
              });
            }

            return `
            <div class="border-l dark:border-white dark:border-opacity-5 border-black border-opacity-5 h-full min-h-screen">
              <div class="grid grid-cols-3 border-b dark:border-white dark:border-opacity-5 border-black border-opacity-5">
                <div class="col-span-2 border-r dark:border-white dark:border-opacity-5 border-black border-opacity-5 flex flex-col">
                  <h1 class="p-5 h-full text-xl leading-tight font-semibold m-0">${
                    hit.title
                  }</h1>
                <div class="pl-5 pr-2 py-2 flex items-center space-x-3 text-xs border-t dark:border-white dark:border-opacity-5 border-black border-opacity-5">
                  <div class="flex items-center">
                    <div class="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center">
                      <img src="${hit.instructor_avatar_url}" />
                    </div>
                    <span class="pl-2">${hit.instructor_name}</span>
                  </div>
                  <div class="bg-yellow-500 rounded-full text-white leading-none px-2 py-1 text-xs uppercase">
                    ${hit.access_state}
                  </div>
                  <div>
                    ${convertTimeWithTitles(hit.duration)}
                  </div>
                </div>
                  </div>
                  <div class="p-5">
                    <img src="${hit.image}" />
                  </div>
              </div>
              <div class="border-b dark:border-white dark:border-opacity-5 border-black border-opacity-5">
                <article class="prose prose-sm dark:prose-dark">
                  ${md(hit?.description || "")}
                </article>
              </div>
              <ul class="text-sm list-none list-inside m-0">
              <div class="uppercase text-xs pb-2 tracking-wide opacity-60 px-5 pt-5">Lessons</div>
                  ${lessons
                    ?.map((lesson, i) => {
                      return `
                      <li class="list-none">
                      <a class="dark:hover:bg-white dark:hover:bg-opacity-5 flex items-baseline py-3 px-5 border-b dark:border-white dark:border-opacity-5 border-black border-opacity-5 font-medium" 
                      href="https://egghead.io${lesson.path}">
                      <span class="opacity-50 pr-2 text-xs">${i + 1}</span>
                      ${lesson.title}
                      </a>
                      </li>
                      `;
                    })
                    .join("")}
              </ul>
            </div>
            `;
          },
        };
      });
    }
  }
);

let url = hit.url;
if (flag?.instructor) url = `https://egghead.io/${hit.instructor_path}`;
if (flag?.twitter) url = `https://twitter.com/${hit.instructor.twitter}`;
if (flag?.website) url = `${hit.instructor.twitter}`;

let selectedLesson = Object.keys(flag).find(parseInt); //find a number
if (selectedLesson) {
  url = `https://egghead.io${lessons?.[selectedLesson].path}`; //we had to re-assign "lessons" in the preview fn. No other way
}
await $`open ${url}`;

// ———— UTILS ————

function convertTimeWithTitles(seconds) {
  if (seconds < 0) seconds = 0;
  const hours = ~~(seconds / 3600);
  const mins = ~~((seconds - hours * 3600) / 60);
  const secs = (seconds - hours * 3600 - mins * 60) % 60;

  let result = "";

  if (hours) result += hours + "h ";
  if (mins) result += mins + "m ";
  if (mins < 1) result += secs + "s ";

  return result.trim();
}
