let { paramCase } = await npm("change-case");

// let console.log = (str) => chalk.green`${str}`
// let console.warn = (str) => chalk.red`${str}`

// https://egghead.io/playlists/
// let eggAxios = axios.create({
//   baseURL: 'https://egghead.io',
//   headers: {Authorization: `Bearer ${env.EGGHEAD_AUTH_TOKEN}`},
// })

// ---------------------
//? Constants
// ---------------------
const BASE_URL = "https://app.egghead.io/api/v1";
const CONTENT_TYPE = {
  INSTRUCTOR: "instructors",
  PLAYLIST: "playlists",
  LESSON: "lessons",
};

const PLAYLIST_CHOICES = {
  ID: "Playlist id",
  INSTRUCTOR_ID: "Instructor id",
  SLUGS: "Slugs",
  TITLES: "Titles",
  LESSON_IDS: "Lesson ids",
  DESCRIPTIONS: "Descriptions",
};

const INSTRUCTOR_CHOICES = {
  ID: "Instructor id",
  PLAYLIST: "Playlist",
};

const LESSON_CHOICES = {
  ID: "Lesson id",
  TITLE: "Title",
  INSTRUCTOR_ID: "Instructor id",
  CASTING_WORDS_ORDER: "Casting words order id",
};

// ---------------------
// ? Utility functions
// ---------------------'
let choosePlaylist = async () =>
  await arg("What playlist info would you like?", [
    PLAYLIST_CHOICES.ID,
    PLAYLIST_CHOICES.INSTRUCTOR_ID,
    PLAYLIST_CHOICES.SLUGS,
    PLAYLIST_CHOICES.TITLES,
    PLAYLIST_CHOICES.LESSON_IDS,
    PLAYLIST_CHOICES.DESCRIPTIONS,
  ]);

let chooseInstructor = async () =>
  await arg("What instructor info would you like?", [
    INSTRUCTOR_CHOICES.ID,
    INSTRUCTOR_CHOICES.PLAYLIST,
  ]);

let chooseLesson = async () =>
  await arg("What lesson info would you like?", [
    LESSON_CHOICES.ID,
    LESSON_CHOICES.TITLE,
    LESSON_CHOICES.INSTRUCTOR_ID,
    LESSON_CHOICES.CASTING_WORDS_ORDER,
  ]);

let getData = async (base_url, uri, slug) => {
  return await get(`${base_url}/${uri}/${slug}`, {
    headers: { Authorization: `Bearer ${await env("EGGHEAD_AUTH_TOKEN")}` },
  }).catch(() => console.warn(`No ${uri} found under "${slug}"`));
};

// ---------------------
//! START OF SCRIPT / first input
// ---------------------
let contentQueryType = await arg("Where would you like to start your search?", [
  CONTENT_TYPE.INSTRUCTOR,
  CONTENT_TYPE.PLAYLIST,
  CONTENT_TYPE.LESSON,
]);

// ---------------------
//! Select what type of playlist data to retrieve
// ---------------------
let getPlaylistData = async (playlistChoice, { data = null }) => {
  if (!data) return;
  switch (playlistChoice) {
    case PLAYLIST_CHOICES.ID: {
      copy(data.id);
      console.log("✅ Playlist id found and copied!");
      break;
    }
    case PLAYLIST_CHOICES.INSTRUCTOR_ID: {
      copy(data.instructor.id);
      console.log("✅ Instructor id found and copied!");
      break;
    }
    case PLAYLIST_CHOICES.LESSON_IDS: {
      let reducedResult = data.items.reduce((acc, curr) => {
        acc += String(curr.id) + "\n";
        acc += String(curr.title) + "\n";
        acc += String(curr.slug) + "\n";
        acc += "\n";
        acc += "\n";
        acc += String(curr.summary) + "\n";
        acc += "\n";
        acc += "\n";
        acc += "\n";
        return acc;
      }, "");

      copy(reducedResult);
      console.log("✅ Playlist found and titles copied!");
      break;
    }
    case PLAYLIST_CHOICES.TITLES: {
      let reducedResult = data.items.reduce((acc, curr) => {
        acc += String(curr.title) + "\n";
        return acc;
      }, "");

      copy(reducedResult);
      console.log("✅ Playlist found and titles copied!");
      break;
    }
    case PLAYLIST_CHOICES.SLUGS: {
      let reducedResult = data.items.reduce((acc, curr) => {
        acc += String(curr.slug) + "\n";
        return acc;
      }, "");

      copy(reducedResult);
      console.log("✅ Playlist found and slugs copied!");
      break;
    }
    case PLAYLIST_CHOICES.DESCRIPTIONS: {
      let reducedResult = data.items.reduce((acc, curr) => {
        acc += String(curr.summary) + "\n";
        return acc;
      }, "");

      copy(reducedResult);
      console.log("✅ Playlist found and summary copied!");
      break;
    }
    default:
      console.log("done");
  }
};

// ---------------------
//! Select what type of instructor data to retrieve
// ---------------------
let getInstructorData = async (instructorChoice, { data = null }) => {
  switch (instructorChoice) {
    case INSTRUCTOR_CHOICES.ID: {
      copy(data.id);
      console.log("✅ Instructor id found and copied!");
      break;
    }
    case INSTRUCTOR_CHOICES.PLAYLIST: {
      let instructorPlaylistSlug = await arg("Select a playlist: ", () => {
        return data.playlists.map((playlist) => playlist.slug);
      });

      let res = await getData(
        BASE_URL,
        CONTENT_TYPE.PLAYLIST,
        instructorPlaylistSlug
      );
      let playlistChoice = await choosePlaylist();

      getPlaylistData(playlistChoice, res);

      break;
    }
    default:
      console.log(oops);
  }
};

// ---------------------
//! Select what type of lesson data to retrieve
// ---------------------
let getLessonData = async (lessonChoice, { data = null }) => {
  switch (lessonChoice) {
    case LESSON_CHOICES.ID: {
      copy(data.id);
      console.log("✅ Lesson id found and copied!");
      break;
    }
    case LESSON_CHOICES.TITLE: {
      copy(data.title);
      console.log("✅ Lesson Title found and copied!");
      break;
    }
    case LESSON_CHOICES.INSTRUCTOR_ID: {
      copy(data.instructor.id);
      console.log("✅ Lesson Instructor id found and copied!");
      break;
    }
    case LESSON_CHOICES.CASTING_WORDS_ORDER: {
      let cwOrder = data.casting_words_order
        ? data.casting_words_order
        : "null";
      copy(cwOrder);
      console.log("✅ Casting Words order id found and copied!");
      break;
    }
    default:
      console.log(oops);
  }
};

// ---------------------
//! Select what type of content to retrieve
// ---------------------
switch (contentQueryType) {
  case CONTENT_TYPE.INSTRUCTOR: {
    let slug = await arg("Enter an instructor name (Zac Jones): ");
    let properSlug = paramCase(slug);

    let res = await getData(BASE_URL, contentQueryType, properSlug);
    let instructorChoice = await chooseInstructor();

    getInstructorData(instructorChoice, res);
    break;
  }
  case CONTENT_TYPE.PLAYLIST: {
    let slug = await arg("Enter a slug: ");

    let res = await getData(BASE_URL, contentQueryType, slug);
    let playlistChoice = await choosePlaylist();

    getPlaylistData(playlistChoice, res);

    break;
  }
  case CONTENT_TYPE.LESSON: {
    let slug = await arg("Enter a lesson slug: ");

    let res = await getData(BASE_URL, contentQueryType, slug);
    let lessonChoice = await chooseLesson();

    getLessonData(lessonChoice, res);
    break;
  }
  default:
    console.log("What?");
}
