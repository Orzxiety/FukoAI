const fs = require('node:fs')
const path = require('node:path')
const { Client, GatewayIntentBits, ActivityType } = require('discord.js')
const { SUMMON_PREFIX, BOT_TOKEN } = require('./config.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    presence: {
        activities: [{
            name: `${SUMMON_PREFIX}[сообщение]`,
            type: ActivityType.Listening
        }]
    },
    allowedMentions: { parse: [] } 
})

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.login(BOT_TOKEN)