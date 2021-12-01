// Shortcut:

let { paramCase } = await npm("text-case");

let { eggheadSanityClient } = await lib("sanity");

let slug = await arg("please enter the slugified version of persons name: ");
let person_id = await arg("Please enter sanity _id of person: ");

let createIllustratorCollaborator = async () => {
  let sanityIllustratorCollaborator = {
    _id: `collaborator-illustrator-${slug}`,
    _type: "collaborator",
    department: "egghead",
    person: {
      _ref: `${person_id}`,
      _type: "reference",
    },
    role: "illustrator",
    title: "illustrator",
  };

  try {
    await eggheadSanityClient.create(sanityIllustratorCollaborator);

    console.log(` ✅ Sanity Illustrator Collaborator Created`);
  } catch (err) {
    console.log(err);
  }
};

await createIllustratorCollaborator();
