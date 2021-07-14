const { collaborators } = await lib("sanity");

let collabs = await db("sanityCollaborators", {
  collaborators,
});

console.log(collabs);
