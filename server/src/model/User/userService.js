// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { createPool } = require("mysql");

exports.createUser = async function (nickName, email, password) {
    try{
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if(emailRows.length > 0) {
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        }

        // 비밀번호 암호화
        // TODO : 수정할 것
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const insetUserInfoParams = [nickName, email, password];
        //const Connection = await pool.getConnection(async (conn) => conn); //TODO : DB 연결 시 수정

        const userIdResult = await userDao.insertInfo(insertUserInfoParams); //TODO : DB 연결 시 수정할 수도
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
        // connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err){
        logger.error(`createUser Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};