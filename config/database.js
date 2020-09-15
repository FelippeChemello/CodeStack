const { Pool } = require('pg');


const pool = new Pool({
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

pool.on('connect', () => {
    console.log('Base de Dados conectado com sucesso!');
});

pool.on('error', (error) => {
    console.error("Erro ao conectar na base de dados");
})

module.exports = {
    query: (text, params) => pool.query(text, params),
};
