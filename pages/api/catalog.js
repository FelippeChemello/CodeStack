const db = require('../../config/database')

export default async (request, response) => {
    const res = await db.query("SELECT * FROM portfolio ORDER BY created_at DESC")

    response.send(res.rows)
}
