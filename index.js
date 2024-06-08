const fs = require('node:fs')
const path = require('node:path')
const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js')
const { SUMMON_MESSAGE, BOT_TOKEN } = require('./config.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.MessageContent
    ],
    presence: {
        activities: [{
            name: `${SUMMON_MESSAGE}[сообщение]`,
            type: ActivityType.Listening
        }]
    }
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