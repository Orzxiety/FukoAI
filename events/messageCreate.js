const { Events } = require('discord.js')
const { FreejourneyClient } = require('../service/freejourney.js')
const { SUMMON_PREFIX, PERMITTED_GUILDS, LOADING_EMOJI } = require('../config.json')

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot || !message.content.startsWith(SUMMON_PREFIX)) return
        if (!PERMITTED_GUILDS.includes(message.guild.id)) return

        const freejourneyClient = new FreejourneyClient()
        const slicedMessageContent = message.content.slice(SUMMON_PREFIX.length)

        message.reply({ content: `${LOADING_EMOJI}${LOADING_EMOJI.length > 0 ? ' ': ''}**Подождите...**`, allowedMentions: { parse: [] } }).then(async (outputMessage) => {
            const output = await freejourneyClient.send(slicedMessageContent)

            if (!output.completion) {
                return outputMessage.edit({ content: 'Не удалось получить ответ от нейросети.', allowedMentions: { parse: [] } })
            }

            completion = output.completion

            if (completion.length > 2000) {
                completion = completion.substring(0, 1996)
                completion = completion + ' ...'
            }

            outputMessage.edit({ content: completion, allowedMentions: { parse: [] } })
        })
    }
}