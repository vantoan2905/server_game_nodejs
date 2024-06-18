// db.js
const sql = require('mssql');

const config = {
    user: 'database',          // Replace with your SQL Server username
    password: '29052003T',      // Replace with your SQL Server password
    server: '127.0.0.1',          // Replace with your SQL Server address (e.g., 'localhost' or '127.0.0.1')
    database: 'game_dataset',      // Replace with your database name
    options: {
        encrypt: true,              // Use true if you're on Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};
