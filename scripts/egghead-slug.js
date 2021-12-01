// Menu: Search egghead.io
// Description: Browse egghead.io's lesson library

import "@johnlindquist/kit";

let algoliasearch = await npm("algoliasearch");
let app = await env("EGGHEAD_PUBLIC_ALGOLIA_APP");
let key = await env("EGGHEAD_PUBLIC_ALGOLIA_KEY");
let client = algoliasearch(app, key);

let index = client.initIndex("content_production");

let hit = await arg(
  {
    placeholder: "Search egghead",
    input: "react",
  },
  async (input) => {
    if (input) {
      let { hits } = await index.search(input);

      return hits.map((hit) => {
        return {
          name: hit.title,
          value: hit,
          tag: hit.type,
          description: hit.instructor_name,
          preview: async () => {
            return md(`
slug: ${hit?.slug}

<hr>

- [${hit.title}](${hit.url})
- [${hit.instructor_name}](https://egghead.io/${hit.instructor_path})
- ${hit?.summary ? hit.summary : ""}

![](${hit.image})

              
              `);
          },
        };
      });
    }
  }
);

copy(hit?.slug);
return hit?.slug;
