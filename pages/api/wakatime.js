import axios from 'axios'
import mock from './mock/wakatime'

const authToken = process.env.WAKATIME_TOKEN_AUTH

export default async (request, response) => {
    const isDev = (typeof request.query.mock != undefined || process.env.NODE_ENV === 'development')

    if (isDev) {
        response.json(mock.data)
    } else {
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
        
        response.json(wakatimeResponse.data.data)
    }
}
