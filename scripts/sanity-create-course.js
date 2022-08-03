let { nanoid } = await npm("nanoid")

let { selectedIllustrator, eggheadSanityClient } = await lib("sanity")
let { queryEggheadCourse, eggheadGraphQLClient } = await lib("egghead")

const courseID = await arg("Enter Course slug: ")

let illustrator = await selectedIllustrator()

let sanityIllustrator = (tmpIllustrator) => {
  if (!tmpIllustrator) return
  return {
    _key: nanoid(),
    _ref: `collaborator-illustrator-${tmpIllustrator}`,
    _type: "reference",
  }
}

let railsData = await queryEggheadCourse(courseID)

function graphQlToSanity(railsData) {
  let { id, title, slug, description, image, path, resources, instructor } =
    railsData.course

  const sanityInstructor = {
    _key: nanoid(),
    _ref: `collaborator-instructor-${instructor.slug}`,
    _type: "reference",
  }

  let courseIllustrator = sanityIllustrator(illustrator)

  let lessons = resources.map((resource) => {
    let { title, id, description, image, path, slug } = resource
    return {
      _key: nanoid(),
      _type: "resource",
      productionProcessState: "contentReview",
      type: "video",
      externalType: "lesson",
      path,
      slug: {
        _type: "slug",
        current: slug,
      },
      title,
      externalId: id,
      description,
      image: image.image_url,
      collaborators: [sanityInstructor],
    }
  })

  let collaborators =
    courseIllustrator._ref !== "collaborator-illustrator-null"
      ? [sanityInstructor, courseIllustrator]
      : [sanityInstructor]

  return {
    _type: "resource",
    type: "course",
    externalType: "playlist",
    productionProcessState: "contentReview",
    slug: {
      _type: "slug",
      current: slug,
    },
    externalId: id,
    path,
    title,
    description,
    image,
    resources: lessons,
    collaborators,
  }
}

let graphQLtoSanityData = graphQlToSanity(railsData)
//console.log(graphQLtoSanityData);

try {
  await eggheadSanityClient.create(graphQLtoSanityData)
} catch (err) {
  if (err.statusCode === 409) {
    console.log(err.response.body.error.items[0].error.referenceID)
    show(
      "Collaborator " +
        err.response.body.error.items[0].error.referenceID +
        " does not exist."
    )
  } else {
    console.log(err)
  }
}
