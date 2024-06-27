// db.js
const { Pool } = require('pg'); // Correctly import Pool from the pg library


const config = {
    user: 'postgres',          // Replace with your PostgreSQL username
    password: 'vantoan',      // Replace with your PostgreSQL password
    host: 'localhost',             // Replace with your PostgreSQL server address (e.g., 'localhost' or '127.0.0.1')
    database: 'games_database',     // Replace with your database name
    port: 5432,                    // Replace with your PostgreSQL port if different from 5432
};

const pool = new Pool(config);

pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL');
        client.release(); // release the client back to the pool
    })
    .catch(err => console.error('Database Connection Failed! Bad Config: ', err));

module.exports = {
    pool
};
