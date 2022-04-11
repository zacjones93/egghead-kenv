let { nanoid } = await npm("nanoid");
let { GraphQLClient, gql } = await npm("graphql-request");
const sanityClient = await npm("@sanity/client");

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
let key = await env("SANITY_READ_WRITE_KEY");

export const eggheadAuthHeaders = {
  Authorization: `Bearer ${eggheadUserToken}`,
};

const courseQuery = gql`
  query getCourse($slug: String!) {
    course: playlist(slug: $slug) {
      id
      path
      title
      description
      image: square_cover_large_url
      resources: lessons {
        title
        id
        path
        slug
        description
        image: primary_tag {
          image_url
        }
      }
      instructor {
        slug
      }
    }
  }
`;

const eggheadSanityClient = sanityClient({
  projectId: "sb1i5dlc",
  dataset: "production",
  token: key,
  useCdn: false, // `false` if you want to ensure fresh data
});

function queryEggheadCourse(slug) {
  return eggheadGraphQLClient.request(courseQuery, {
    slug,
  });
}

export const eggheadGraphQLClient = new GraphQLClient(
  "https://app.egghead.io/graphql",
  {
    headers: {
      Authorization: `Bearer ${eggheadUserToken}`,
    },
  }
);

const courseID = await arg("Enter Course slug: ");


let railsData = await queryEggheadCourse(courseID);

function graphQlToSanity(railsData) {
  let { id, title, description, image, path, resources, instructor } =
    railsData.course;

  const sanityInstructor = {
    _key: nanoid(),
    _ref: `collaborator-instructor-${instructor.slug}`,
    _type: "reference",
  };



  let lessons = resources.map((resource) => {
    let { title, id, description, image, path } = resource;
    return {
      _key: nanoid(),
      _type: "resource",
      type: "video",
      externalType: "lesson",
      path,
      title,
      externalId: id,
      description,
      image: image.image_url,
      collaborators: [sanityInstructor],
    };
  });



  return {
    _type: "resource",
    type: "course",
    externalType: "playlist",
    externalId: id,
    path,
    title,
    description,
    image,
    resources: lessons,
    collaborators: [sanityInstructor],
  };
}

let graphQLtoSanityData = graphQlToSanity(railsData);
//console.log(graphQLtoSanityData);

try {
  await eggheadSanityClient.create(graphQLtoSanityData);
} catch (err) {
  if(err.statusCode === 409) {
    console.log(err.response.body.error.items[0].error.referenceID)
    show("Collaborator " + err.response.body.error.items[0].error.referenceID + " does not exist.")
  } else {
    console.log(err);
  }
}
