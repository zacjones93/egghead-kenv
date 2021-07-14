let { request, gql } = await npm("graphql-request");

const query = gql`
  {
    instructors(per_page: 1000) {
      full_name
      slug
    }
  }
`;

let slug = await arg("Select an instructor:", async () => {
  let response = await request("https://app.egghead.io/graphql", query);

  return response.instructors.map(({ full_name, slug }) => ({
    name: full_name,
    value: slug,
  }));
});

console.log(slug);
