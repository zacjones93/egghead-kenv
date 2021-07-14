// Shortcut: control+i

let { paramCase } = await npm("text-case");

let { eggheadSanityClient, createInstructorCollaborator } = await lib("sanity");

const instructorName = await arg("Enter Instructor Name: ");
const instructorSlug = paramCase(instructorName);

await createInstructorCollaborator(instructorSlug);
