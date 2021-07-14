let { request, gql } = await npm("graphql-request");

const query = gql`
  query getCourse($slug: String!) {
    course(slug: $slug) {
      id
      slug
      path
      title
      description
      instructor {
        id
        full_name
        twitter
        website
        playlists {
          slug
        }
      }
      lessons {
        title
        id
        path
        slug
        description
      }
    }
  }
`;

let courseSlug = await arg("Type a egghead course slug:");

let response = await request("https://app.egghead.io/graphql", query, {
  slug: courseSlug,
});

const chooseCourse = async () => {
  courseSlug = await arg("Type a egghead course slug:");
};

const listCourseMeta = async () => {
  const { id, title, slug, path, description } = response.course;

  const meta = {
    id,
    title,
    slug,
    path,
    description,
  };
  let attribute = await arg("Select Attribute: ", async () => {
    return Object.entries(meta).map(([key, value]) => ({
      name: key,
      value: value,
    }));
  });

  copy(String(attribute));
  show(String(attribute));

  return await listCourseMeta();
};

const listInstructor = async () => {
  await arg("Select Attribute: ", async () => {
    show("todo");
  });
};

const listLessons = () => {
  const { lessons } = response.course;
  const titles = "";

  titles = lessons.reduce((acc, curr) => {
    acc += String(curr.title) + "\n";
    return acc;
  }, "");

  copy(titles);
  console.log("✅ Playlist found and titles copied!");
};

onTab("List", listCourseMeta);
onTab("Instructor", listInstructor);
onTab("Lessons", listLessons);
onTab("Choose another", chooseCourse);
