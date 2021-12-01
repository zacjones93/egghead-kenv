/** @type typeof import("axios") */
let axios = await npm("axios");

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");

let slug = await arg("Enter lesson slug: ");

// let lesson = await get(`https://app.egghead.io/api/v1/lessons/${slug}`).then(
//   (res) => res.data
// );

let res = await axios
  .delete(`https://app.egghead.io/lessons/${slug}`, {
    headers: {
      authorization: `${eggheadUserToken}`,
    },
  })
  .catch((err) => console.log(err))
  .then((res) => console.log(res));
