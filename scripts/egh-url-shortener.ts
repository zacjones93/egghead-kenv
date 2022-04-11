// Name: egh-url-shortener

import "@johnlindquist/kit"

let eggheadUserToken = await env('EGGHEAD_AUTH_TOKEN')
let url_to_shorten = await arg('Enter URL')

let {data} = await post('https://app.egghead.io/api/v1/short_urls', {
  short_url: {
      original_url: url_to_shorten
  }  
},
{
  headers: {
  Authorization: `Bearer ${eggheadUserToken}`,
}
})
copy(data.http_url)
