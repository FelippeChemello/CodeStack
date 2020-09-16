import axios from 'axios'
import mock from './mock/wakatime'

const authToken = process.env.WAKATIME_TOKEN_AUTH

export default async (request, response) => {

    await sleep(request.query.sleep)

    response.send(`Eu dormi por ${request.query.sleep/1000} segundo(s)`)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}