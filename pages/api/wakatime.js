import axios from 'axios'

const authToken = process.env.WAKATIME_TOKEN_AUTH

export default async (request, response) => {
    do {
        var wakatimeResponse = await axios.get(
            "https://wakatime.com/api/v1/users/current/stats/last_year",
            {
                headers: {
                    'Authorization': `Basic ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } while (wakatimeResponse.data.data.is_up_to_date == false)

    response.send(wakatimeResponse.data.data)
}