const sql = require('mysql2/promise');
require("dotenv").config();

// 3306
const dbConfig = {
    host: "localhost",
    user: "root",
    database: "sm_users4",
}

const pool = sql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    password: process.env.SQL_PASSWORD
});

console.log("create pool");

module.exports = pool;
