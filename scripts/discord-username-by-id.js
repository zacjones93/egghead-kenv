/** @type {import("@johnlindquist/kit")} */

import Discord, { Client, Intents } from 'discord.js'

let token = await env('BOT_TOKEN')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: [ 'CHANNEL'] });

let userId = await arg('Enter user id: ')

client.on('ready', async () => {
  const username = await client.users.fetch(userId)
    .then((user) => user.username)
  show(`
    <div class="bg-black text-white h-screen p-5">
      ${username}
    </div>
  `)
})
