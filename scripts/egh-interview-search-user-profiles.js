// Name: Learner Interview Search User Profiles
// Description: CIO look up
// Author: Zac Jones

import "@johnlindquist/kit"


let email = await arg("Enter CIO email: ")

let urlSafeEmail = encodeURIComponent(email)

let cioEmailUrl = `https://fly.customer.io/env/97673/people?email=${urlSafeEmail}`
let githubEmailUrl = `https://github.com/search?q=${urlSafeEmail}&type=users`


onTab('CIO', async () => {
    await arg("hit enter", [cioEmailUrl])
    exec(`open '${cioEmailUrl}'`)
})
onTab('GitHub', async () => {
    await arg("hit enter", [githubEmailUrl])
    exec(`open '${githubEmailUrl}'`)
})
onTab('All', async () => {
    await arg("hit enter", [cioEmailUrl, githubEmailUrl])
    exec(`open '${githubEmailUrl}'`)
    exec(`open '${cioEmailUrl}'`)
})
onTab('CIO ID', async () => {
    let cioId = await arg("Enter CIO_ID: ")
    exec(`open 'https://fly.customer.io/env/97673/people/${cioId}'`)
})
