// Description: Publish TimeStamped notes to egghead
// Author: Zac Jones
// Twitter: @zacjones93

/** @type typeof import("octokit") */
let { Octokit } = await npm("@octokit/rest");
let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
let { queryEggheadCourse } = await lib("egghead");

let octokit = new Octokit();
export let getCourseNotesContentByPath = async (path) => {
  try{
    let { data } = await octokit.rest.repos.getContent({
      owner: "eggheadio",
      repo: "eggheadio-course-notes",
      path,
    });
    return data;
  } catch (err) {
    if(err.status === 404){
      console.log(`Notes folder '${path}' does not exist. Check the file structure of the Course Notes you are trying to publish.`)
    }
  }
};

//! Loads course notes folders so you choose which notes to view
let rootContent = await getCourseNotesContentByPath("");

let { name: course } = await arg(
  "Select path",
  rootContent.filter((d) => d.type === "dir")
);

//! Loads individual course notes
//! expects notes to be in a `/notes` subfolder!
let notesContent = await getCourseNotesContentByPath(`${course}/notes`);

let getCourseNotesFolder = async () => {
  await run(kenvPath("kenvs", "egghead", "scripts", "egghead-course-notes.js"));
};

let getNote = async () => {
  if(!notesContent) return
  let { name: fileName } = await arg(
    "Select a Note to view:",
    notesContent.filter((d) => d.type === "file" && d.name.endsWith(".md"))
  );

  let { content, encoding } = await getCourseNotesContentByPath(
    `${course}/notes/${fileName}`
  );

  return Buffer.from(content, encoding).toString();
};

let viewNote = async () => {
  await editor(await getNote());
};

let createCdnLink = (slug) =>
  `https://cdn.jsdelivr.net/gh/eggheadio/eggheadio-course-notes/${course}/notes/${slug}`;

let postNote = async (url, noteCdn) => {
  await put(
    url,
    {
      staff_notes_url: noteCdn,
    },
    {
      headers: {
        Authorization: `Bearer ${eggheadUserToken}`,
      },
    }
  )
    .then((response) => console.log(response.status))
    .catch((err) => console.log("ERROR", err));
};

let publishNotes = async () => {
  let answer = await arg("Do you really want to publish these notes?", [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ]);

  if (answer === true) {
    let courseSlug = await arg(
      {
        placeholder: "Enter the course slug: ",
        hint: "If the option down below doesn't match the current course slug, enter the current slug in the input field above",
      },
      [course]
    );

    let {
      course: { resources: lessons },
    } = await queryEggheadCourse(courseSlug);
    let eggheadLessonSlugs = lessons.map((lesson) => lesson.slug);
    let lessonUploadCounter = 1;

    notesContent.map(async (note) => {
      let noteName = note.name
        .replace(/(^[0-9]+[-_])/g, "")
        .replace(/(\.md)/g, "");
      if (eggheadLessonSlugs.includes(noteName)) {
        let cdn = createCdnLink(note.name);
        let lessonUrl = `https://app.egghead.io/api/v1/lessons/${noteName}`;
        lessonUploadCounter++
        postNote(lessonUrl, cdn);
      }
    });
    show(`
      <div class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              Notes are published for ${course}
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>
                ${lessonUploadCounter} notes have been published
              </p>
            </div>
          </div>
        </div>
      </div>`)
  } else {
    console.log("Maybe next time!");
  }
};

let publishSingleNote = async () => {
  let { name: fileName } = await arg(
    "Select a note to publish:",
    notesContent.filter((d) => d.type === "file" && d.name.endsWith(".md"))
  );

  let lessonSlug = fileName
    .replace(/(^[0-9]+[-_])/g, "")
    .replace(/(\.md)/g, "");

  let cdn = createCdnLink(fileName);
  let lessonUrl = `https://app.egghead.io/api/v1/lessons/${lessonSlug}`;

  postNote(lessonUrl, cdn);
};

onTab("View Note", viewNote);
onTab("Publish a Single Note", publishSingleNote);
onTab("Publish All Notes", publishNotes);
onTab("Select New Course", getCourseNotesFolder);
