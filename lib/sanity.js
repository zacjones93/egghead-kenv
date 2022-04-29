const sanityClient = await npm("@sanity/client");
let { GraphQLClient, gql } = await npm("graphql-request");
let { queryEggheadInstructor, eggheadGraphQLClient } = await lib("egghead");
let { nanoid } = await npm("nanoid");
let groq = await npm("groq");



export const eggheadSanityClient = sanityClient({
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

let collaboratorsQuery = groq`*[_type == 'collaborator'][]{
  'name': person->name,
  'slug': person->slug.current,
  'image': person->image.url,
  role,
  _id
}`;

export let createSanityInstructorReference = (instructorSlug) => {
  return {
    _key: nanoid(),
    _ref: `collaborator-instructor-${instructorSlug}`,
    _type: "reference",
  };
};

export let collaborators = await eggheadSanityClient.fetch(collaboratorsQuery);

let illustrators = await eggheadSanityClient.fetch(illustratorQuery);

illustrators.push({
  name: "None",
  slug: "null",
  image: "",
});

export let selectedIllustrator = async () =>
  await arg("Select an Illustrator", (input) => {
    return illustrators.map((illustrator) => {
      return {
        name: illustrator.name,
        value: illustrator.slug,
        img: illustrator.image,
      };
    });
  });

//! Create Sanity Instructor Collaborator
let graphQLtoInstructorSanityData = (railsInstructor) => {
  let { avatar_url, twitter, website, slug, full_name } =
    railsInstructor.instructor;

  return {
    _id: `person-${slug}`,
    _type: "person",
    image: {
      label: "avatar",
      url: avatar_url,
    },
    name: full_name,
    slug: {
      current: slug,
    },
    twitter: `https://twitter.com/${twitter}`,
    website,
  };
};

let sanityPersonToInstructorCollaborator = (railsInstructor) => {
  let { slug } = railsInstructor.instructor;

  return {
    _id: `collaborator-instructor-${slug}`,
    _type: "collaborator",
    department: "egghead",
    person: {
      _ref: `person-${slug}`,
      _type: "reference",
    },
    role: "instructor",
    title: "instructor",
  };
};

export let createInstructorCollaborator = async (slug) => {
  let railsData = await queryEggheadInstructor(slug);

  let sanityPerson = graphQLtoInstructorSanityData(railsData);
  let sanityInstructorCollaborator =
    sanityPersonToInstructorCollaborator(railsData);

  try {
    await eggheadSanityClient.create(sanityPerson);
    await eggheadSanityClient.create(sanityInstructorCollaborator);

    console.log(` ✅ Sanity Instructor Collaborator Created`);
  } catch (err) {
    console.log(err);
  }
};
