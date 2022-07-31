const mysql = require('mysql2/promise');
const {logger} = require('./winston');

require('dotenv').config()
let host = process.env.DB_HOST;
let user = process.env.DB_USER;
let port = process.env.DB_PORT;
let password = process.env.DB_PASSWD;
let database = process.env.DB_DATABASE;

//env 파일과 연결
const pool = mysql.createPool({
    host,
    user,
    port,
    password,
    database
});

module.exports = {
    pool : pool
};