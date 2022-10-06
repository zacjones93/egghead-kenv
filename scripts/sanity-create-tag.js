// Author: Zac Jones

import "@johnlindquist/kit"
let { nanoid } = await npm("nanoid");
let { GraphQLClient, gql } = await npm("graphql-request");
const sanityClient = await npm("@sanity/client");

let key = await env("SANITY_READ_WRITE_KEY");
const eggheadSanityClient = sanityClient({
  projectId: "sb1i5dlc",
  dataset: "production",
  token: key,
  useCdn: false, // `false` if you want to ensure fresh data
});
let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
const eggheadGraphQLClient = new GraphQLClient(
  "https://app.egghead.io/graphql",
  {
    headers: {
      Authorization: `Bearer ${eggheadUserToken}`,
    },
  }
);


const tagSlug = await arg("Enter Tag Slug: ")


const tagQuery = gql`
  query getTag($slug: String!) {
    tag: tag(slug: $slug) {
      name
      description
      image: image_480_url
      path
    }
  }
`;

async function queryEggheadTag(slug) {
  return await eggheadGraphQLClient.request(tagQuery, {
    slug,
  });
}

let tagFromRails = await queryEggheadTag(tagSlug)
console.log({tagFromRails})

let convertTagToSanity = (railsTag) => {

  let { name,
    description,
    image,
    path, } = railsTag.tag;

    

  return {
    "_id": `software-library-${name}`,
    "_type": "software-library",
    "_updatedAt": "2022-09-24T00:54:35Z",
    "description": description,
    "image": {
      "_type": "image-url",
      "label": `${name} icon`,
      "url": image
    },
    name,
    path,
    "slug": {
      "_type": "slug",
      "current": name
    },
    "url": ""
  };
};

let sanityTag = convertTagToSanity(tagFromRails)

// try {
//   await eggheadSanityClient.create(sanityTag)
//   console.log(`✅ Sanity TagCreated`);

// } catch (e) {
//   console.log(err);
// }