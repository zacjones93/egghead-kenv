//! egghead-rails graphql api set up
let { GraphQLClient, gql } = await npm("graphql-request");

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");

export const eggheadAuthHeaders = {
  Authorization: `Bearer ${eggheadUserToken}`,
};

export const eggheadGraphQLClient = new GraphQLClient(
  "https://app.egghead.io/graphql",
  {
    headers: {
      Authorization: `Bearer ${eggheadUserToken}`,
    },
  }
);

export function queryEggheadCourse(slug) {
  return eggheadGraphQLClient.request(courseQuery, {
    slug,
  });
}

export function queryEggheadInstructor(slug) {
  return eggheadGraphQLClient.request(instructorQuery, {
    slug,
  });
}

export function queryEggheadTalk(slug) {
  return eggheadGraphQLClient.request(talkQuery, {
    slug,
  });
}

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

const talkQuery = gql`
  query getTalk($slug: String!) {
    talk: video_resource(slug: $slug) {
      title
      id
      type
      thumb_url
      path
      duration
      slug
      instructor {
        slug
        full_name
      }
    }
  }
`;

//! egghead site admin login
export const siteData = {
  "egghead.io": {
    siteName: "egghead.io",
    name: "egghead.io",
    id: "d25ada502a252a89c5f80fbbae70320785cd73cd54e46a00226ddcf6a446df0c",
    httpUrl: "https://egghead.io",
  },
  epic_react: {
    siteName: "epic_react",
    name: "EpicReact.dev",
    id: "4118545974333dd5a03999d7b141ec809b9e83725630934e907e7205a9ac83cf",
    httpUrl: "https://epicreact.dev/",
  },
  pro_testing: {
    siteName: "pro_testing",
    name: "TestingJavascript.com",
    id: "870edf7cfb5f6a3088fa8580452f90e111df42f7b46de9c969832bb8205ac38d",
    httpUrl: "https://testingjavascript.com",
  },
  pure_react: {
    siteName: "pure_react",
    name: "PureReact.com",
    id: "fce86213683a8809c54687be20a2d7f5683213f6e45a024445e8a1c45f418104",
    httpUrl: "https://purereact.com",
  },
  tech_interviews: {
    siteName: "tech_interviews",
    name: "TechnicalInterviews.dev",
    id: "870e164f049d1ea513c54bc6ff97b14fb2b22403a65e0a71770cea4ec96642c9",
    httpUrl: "https://technicalinterviews.dev",
  },
  just_javascript: {
    siteName: "just_javascript",
    name: "JustJavascript.com",
    id: "3a75acdd3214c8b2b7fef0c3f1972bc833305bfa3686cc62dcb504c8e22fbc56",
    httpUrl: "https://justjavascript.com",
  },
};
export const siteIdChoices = Object.keys(siteData).map((key) => ({
  name: siteData[key].name,
  value: siteData[key].id,
}));
export const siteChoices = Object.keys(siteData).map((key) => ({
  name: siteData[key].name,
  value: siteData[key],
}));
