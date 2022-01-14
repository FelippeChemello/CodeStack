import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body
    const query = req.query

    res.setHeader('Cache-Control', 'no-cache')
    res.status(200).json({ body, query })
}
