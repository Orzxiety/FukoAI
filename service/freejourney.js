const { API_KEY, MODEL_NAME } = require('../config.json')

const API_URL = 'https://api.freejourney.xyz/llms/completions/create'

class FreejourneyClient {
    async send(prompt) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'X-Freejourney-Key': API_KEY
            },
            body: JSON.stringify({ "text": prompt, "model": MODEL_NAME })
        }

        const response = await fetch(API_URL, requestOptions)
        return await response.json()
    }
}

exports.FreejourneyClient = FreejourneyClient