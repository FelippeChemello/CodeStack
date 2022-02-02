import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const createCsrfState = () => Math.random().toString(36).substring(7)
    const csrfState = createCsrfState()
    setCookie(res, 'csrfState', csrfState, { maxAge: 60000 })

    let url = 'https://open-api.tiktok.com/platform/oauth/connect/'
    url += `?client_key=${process.env.TIKTOK_CLIENT_KEY}`
    url += '&scope=user.info.basic'
    url += '&response_type=code'
    url += `&redirect_uri=${encodeURIComponent(
        'https://codestack.me/api/callback'
    )}`
    url += '&state=' + csrfState

    res.redirect(url)
}
