let { items: lessons } = await get(
  "https://app.egghead.io/api/v1/playlists/getting-started-with-recoil-in-react-1fca"
).then((res) => res.data);

inspect(lessons);
