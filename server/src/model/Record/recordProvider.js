// provider : 조회작업 처리

const recordDao = require("./recordDao");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

exports.getQuestion = async function(email, qnum) {
    const connection = await pool.getConnection(async (conn) => conn);
    const questionResult = await recordDao.SelectQuestion(connection, email, qnum); 
    connection.release();

    return questionResult;
};

exports.postRecord = async function(email, qnum, content) {
    const connection = await pool.getConnection(async (conn) => conn);
    const questionResult = await recordDao.InsertAnswer(connection, email, qnum, content); 
    connection.release();

    return questionResult;
};