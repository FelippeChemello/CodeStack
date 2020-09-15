import axios from 'axios'
import mock from './mock/wakatime'

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

    response.json(
        wakatimeResponse.data.data || 
        mock.data
    )
}
