// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");


// 회원가입 api 관련
exports.createUser = async function (nickName, email, password) {
    try{
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if(emailRows.length > 0) {
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        }

        // 비밀번호 암호화
        // TODO : 수정 예정
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const insertUserInfoParams = [nickName, email, password];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);         
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err){
        logger.error(`createUser Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};