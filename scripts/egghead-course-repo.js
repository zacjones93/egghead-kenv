/** @type {import("@johnlindquist/kit")} */
// Description: Publish course code to lessons
// Author: Zac Jones
// Twitter: @zacjones93

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");

let lessons = [];

let courseSlug = await arg("Enter course slug: ");

let response = await fetch(
  `https://app.egghead.io/api/v1/playlists/${courseSlug}/items?flatten=true`
);

if (response.error) {
  show("No lessons with that course slug, try again");
} else {
  lessons = await response.json();
  lessons.unshift({
    title: "stop publishing",
    url: "nothing",
  });

  let formData = await form(
    `
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <input type="text" name="username" placeholder="zacjones93" class="mx-auto my-2"/>

    <input type="text" name="repo" placeholder="egghead-repo" class="mx-auto my-2"/>

    <input type="text" name="branch" placeholder="branch-name" class="mx-auto my-2"/>

    <div class="mx-auto flex mb-2">
      <label for="sameBranch">Check if you want to apply the same branch to every lesson: </label>
      <input type="checkbox" name="sameBranch" value="true" >
    </div>

    <button type="submit" class="mx-auto bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
  </div>
  `
  );

  console.log(formData);

  let deployLessonCode = "";
  while (deployLessonCode?.name !== "0 - stop publishing") {
    deployLessonCode = await arg(
      {
        placeholder: "Pick lesson",
        ignoreBlur: true,
      },
      (input) => {
        return lessons.map((lesson, index) => {
          return {
            name: `${index} - ${lesson.title}`,
            value: lesson,
            img: lesson.icon_url,
          };
        });
      }
    );
    let branchInput = "";
    if (!formData.sameBranch) {
      branchInput = await arg("enter branch: ");
    }
    let branch = branchInput || formData.branch || "";
    if (deployLessonCode?.name !== "0 - stop publishing") {
      await put(
        deployLessonCode.url,
        {
          lesson: {
            github_repo: formData?.repo,
            github_user: formData?.username,
            git_branch: formData?.branch,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${eggheadUserToken}`,
          },
        }
      ).then(() => console.log("✅ success"));
    }
  }
}

function convertTimeWithTitles(seconds) {
  if (seconds < 0) seconds = 0;
  const hours = ~~(seconds / 3600);
  const mins = ~~((seconds - hours * 3600) / 60);
  const secs = (seconds - hours * 3600 - mins * 60) % 60;

  let result = "";

  if (hours) result += hours + "h ";
  if (mins) result += mins + "m ";
  if (mins < 1) result += secs + "s ";

  return result.trim();
}
