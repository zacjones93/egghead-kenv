// .kenv/kenvs/egghead/scripts/egh-url-shortener.ts
import "@johnlindquist/kit";
var eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
var url_to_shorten = await arg("Enter URL");
var { data } = await post(
  "https://app.egghead.io/api/v1/short_urls",
  {
    short_url: {
      original_url: url_to_shorten
    }
  },
  {
    headers: {
      Authorization: `Bearer ${eggheadUserToken}`
    }
  }
);
copy(data.http_url);
