/** @type {import("@johnlindquist/kit")} */
// Author: Creeland Provinsal
// Twitter: @CProvinsal
// Description: Add a playlist's instructor to each lesson

let axios = await npm("axios")
const token = await env("EGGHEAD_AUTH_TOKEN")

const getPlaylist = async () => {
  let input = await arg("Paste in the course slug")

  axios({
    method: "get",
    url: `https://app.egghead.io/api/v1/playlists/${input}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    const {items, instructor} = res.data
    items.forEach(item => {
      console.log(item.lesson_url)
      axios({
        method: "put",
        url: item.lesson_url,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          instructor_id: instructor.id
        }
      })
        .then(res => console.log(res.status, item.title))
        .catch(err => console.log(err))
    })
  })

}


getPlaylist()