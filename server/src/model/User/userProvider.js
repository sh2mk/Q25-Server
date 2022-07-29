// provider : 조회작업 처리

const userDao = require("./userDao");
const { logger } = require("../../../config/winston");
const { createPool } = require("mysql");

exports.emailCheck = async function(email) {
    // const connection = await createPool.getConnection(async (conn) => conn); //TODO : DB 연결
    const emailCheckResult = await userDao.selectUserEmail(email); //TODO : DB 연결 시 수정
    // connection.release();

    return emailCheckResult;
}
