const db = require('../../config/database')

export default async (request, response) => {
    const res = await db.query("SELECT * FROM portfolio")

    response.send(res.rows)
}
