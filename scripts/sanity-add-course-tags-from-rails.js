// Author: Zac Jones
// Name: Update Sanity Course Tag from Rails

import "@johnlindquist/kit"
let groq = await npm("groq")
let { nanoid } = await npm("nanoid");
let { GraphQLClient, gql } = await npm("graphql-request");

/*

! Set up clients

*/

const sanityClient = await npm("@sanity/client");

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
let key = await env("SANITY_READ_WRITE_KEY");

export const eggheadAuthHeaders = {
  Authorization: `Bearer ${eggheadUserToken}`,
};

const eggheadSanityClient = sanityClient({
  projectId: "sb1i5dlc",
  dataset: "production",
  token: key,
  useCdn: false, // `false` if you want to ensure fresh data
});

const eggheadGraphQLClient = new GraphQLClient(
  "https://app.egghead.io/graphql",
  {
    headers: {
      Authorization: `Bearer ${eggheadUserToken}`,
    },
  }
);

const playlistQuery = gql`
  query getPlaylist($slug: String!) {
    playlist: playlist(slug: $slug) {
      externalId: id
      tags {
        name
      }
    }
  }
`;

async function queryEggheadForPlaylist(slug) {
  return await eggheadGraphQLClient.request(playlistQuery, {
    slug,
  });
}

let courseSlug = await arg({
  ignoreBlur: true,
  placeholder: "Enter course slug: ", 
})
let { playlist } = await queryEggheadForPlaylist(courseSlug)

let createSanityTags = (c) => {
  return c.tags.map((tag) => {
    return {
        "_key": nanoid(),
        "_type": "versioned-software-library",
        "library": {
          "_ref": `software-library-${tag.name.toLowerCase()}`,
          "_type": "reference"
        }
    }
  })
}


let courseQuery = groq`*[_type == 'resource' && externalId == ${playlist.externalId}][0]{
  title,
  'id': _id,
  'dependencies': softwareLibraries[]{
    version,
    ...library->{
      description,
      'slug': slug.current,
      path,
      name,
      'label': name,
      'image_url': image.url
    }
  }
}`;





let sanityTags = createSanityTags(playlist)
let sanityCourse = await eggheadSanityClient.fetch(courseQuery);

console.log({sanityCourse, sanityTags})

try {

  await eggheadSanityClient
    .patch(sanityCourse.id) // Document ID to patch
    .setIfMissing({softwareLibraries: sanityTags}) // Shallow merge
    .commit() // Perform the patch and return a promise
  

} catch (err){
  if(err.statusCode === 409) {
    console.log(err.response.body.error.items[0].error.referenceID)
    widget("Tag " + err.response.body.error.items[0].error.referenceID + " does not exist.")

  } else {
    console.log(err);
  }
}

