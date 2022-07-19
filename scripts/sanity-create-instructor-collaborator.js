// Shortcut: control+i
const sanityClient = await npm("@sanity/client");
let { paramCase } = await npm("text-case");
let { GraphQLClient, gql } = await npm("graphql-request");

const instructorQuery = gql`
  query getInstructor($slug: String!) {
    instructor(slug: $slug) {
      id
      full_name
      slug
      bio_short
      twitter
      website
      avatar_url
      playlists {
        id
        title
        description
        slug
        path
        lessons {
          id
          title
          slug
        }
      }
    }
  }
`;


let key = await env("SANITY_READ_WRITE_KEY");
const eggheadSanityClient = sanityClient({
  projectId: "sb1i5dlc",
  dataset: "production",
  token: key,
  useCdn: false, // `false` if you want to ensure fresh data
});
let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
const eggheadAuthHeaders = {
  Authorization: `Bearer ${eggheadUserToken}`,
};
const eggheadGraphQLClient = new GraphQLClient(
  "https://app.egghead.io/graphql",
  {
    headers: {
      Authorization: `Bearer ${eggheadUserToken}`,
    },
  }
);



function queryEggheadInstructor(slug) {
  return eggheadGraphQLClient.request(instructorQuery, {
    slug,
  });
}

let sanityPersonToInstructorCollaborator = (railsInstructor) => {
  let { slug, id } = railsInstructor.instructor;

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
    eggheadInstructorId: id
  };
};

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

let createInstructorCollaborator = async (slug) => {
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

const instructorName = await arg("Enter Instructor Name: ");
const instructorSlug = paramCase(instructorName);

await createInstructorCollaborator(instructorSlug);
