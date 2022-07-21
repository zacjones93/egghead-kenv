let { nanoid } = await npm("nanoid");
let { GraphQLClient, gql } = await npm("graphql-request");

const sanityClient = await npm("@sanity/client");

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
let key = await env("SANITY_READ_WRITE_KEY");

export const eggheadAuthHeaders = {
  Authorization: `Bearer ${eggheadUserToken}`,
};
``
const courseQuery = gql`
  query getCourse($slug: String!) {
    course: playlist(slug: $slug) {
      id
      path
      title
      description
      image: square_cover_large_url
      lessons {
        title
        id
        path
        slug
        description
        media_urls
        image: primary_tag {
          image_url
        }
      }
      instructor {
        slug
        full_name
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

const courseID = await arg({
  placeholder: "Enter course slug: ", 
  ignoreBlur: true
});


let railsData = await queryEggheadCourse(courseID);


function createVideoResources(railsData) {
  let { lessons } = railsData.course;
  let videoResources = lessons.map((lesson) => {
    let { media_urls, title, lesson_url } = lesson;
    return {
      _id: nanoid(),
      _type: "videoResource",
      filename: title,
      originalVideoUrl: lesson_url,
      hslUrl: media_urls[0]
    }
  }
  )
  return videoResources;
}

function createLessons(railsData, videoResources) {
  let { lessons, instructor } = railsData.course;
  const sanityInstructor = {
    _key: nanoid(),
    _ref: `collaborator-instructor-${instructor.slug}`,
    _type: "reference",
  };

  let sanityLessons = lessons.map((lesson, i) => {
    let { title, id, description, image, path, slug } = lesson;
    return {
      _id: nanoid(),
      _type: "lesson",
      title,
      description,
      slug: {
        current: slug
      },
      // path, --- need to update schema for this
      // status: "Published", -- could be Published, Needs Review, or Archived
      collaborators: [sanityInstructor],
      "accessLevel": "free",
      resource: {
        _key: nanoid(),
        "_ref": videoResources[i]._id,
        "_type": "reference"
      }
    };
  }
  )
  return sanityLessons;
}

function createCourse(railsData, sanityLessons) {
  let { id, title, description, image, path, instructor, slug } =
    railsData.course;

  const sanityInstructor = {
    _key: nanoid(),
    _ref: `collaborator-instructor-${instructor.slug}`,
    _type: "reference",
  };

  const sanityLessonRefs = sanityLessons.map((lesson) => {
    return {
      _key: nanoid(),
      _ref: lesson._id,
      _type: "reference",
    };
  })

  console.log({sanityInstructor})

  return {
    _type: "course",
    productionProcessState: 'new',
    slug: {
      current: courseID
    },
    // path,
    title,
    "description": description ? description : "",
    image,
    byline: `${instructor.full_name} • DURATION • Course`,
    lessons: sanityLessonRefs,
    collaborators: [sanityInstructor],
  };
}

const sanityVideoResources = createVideoResources(railsData);
const sanityLessons = createLessons(railsData, sanityVideoResources);
let sanityCourse = createCourse(railsData, sanityLessons);

//console.log(graphQLtoSanityData);

//! Create resources in Sanity
try {
  sanityVideoResources.forEach(async (videoResource) => {
    await eggheadSanityClient.create(
      videoResource
    ).then((res) => {
      console.log(res);
    })
  })
} catch(e) {
  console.log("Error Creating Video Resources", e);
}

// //! Create course lessons in Sanity
try {
  sanityLessons.forEach(async (lesson) => {
    await eggheadSanityClient.create(
      lesson
    );
  })
} catch(e) {
  console.log("Error Creating Lessons", e);
}

try {
  await eggheadSanityClient.create(sanityCourse);
} catch (err) {
  if(err.statusCode === 409) {
    console.log(err.response.body.error.items[0].error.referenceID)
    widget("Collaborator " + err.response.body.error.items[0].error.referenceID + " does not exist.")
  } else {
    console.log(err);
  }
}
