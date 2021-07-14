const sanityClient = await npm("@sanity/client");
let { GraphQLClient, gql } = await npm("graphql-request");
let { nanoid } = await npm("nanoid");
let groq = await npm("groq");

let key = await env("SANITY_READ_WRITE_KEY");
const client = sanityClient({
  projectId: "sb1i5dlc",
  dataset: "production",
  token: key,
  useCdn: false, // `false` if you want to ensure fresh data
});

let illustratorQuery = groq`*[_type == 'collaborator' && role == 'illustrator'][]{
  'name': person->name,
  'slug': person->slug.current,
  'image': person->image.url
}`;

let illustrators = await client.fetch(illustratorQuery);

illustrators.push({
  name: "None",
  value: null,
  image: "",
});

let selectedIllustrator = await arg("Select an Illustrator", (input) => {
  return illustrators.map((illustrator) => {
    let preview = illustrator.image
      ? `<img
    class="h-50 object-center"
   src="${illustrator.image}" 
   alt="">`
      : `<div class="rounded h-full w-full bg-color-grey-900 text white"><span>${illustrator.name}<span></div>`;

    return {
      name: illustrator.name,
      value: illustrator.slug,
      img: illustrator.image,
    };
  });
});

console.log(selectedIllustrator);
