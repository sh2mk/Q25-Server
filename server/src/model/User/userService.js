// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const userProvider = require("./userProvider");
const userDao = require("./userDao");
const postDao = require("../Post/postDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const secretkey=process.env.JWT_SECRET_KEY;

// 회원가입
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

        //추가된 회원에게 25개 질문 할당
        for (var i=1; i<26; i++){
            const addNewRowsParams = [userIdResult[0].insertId, i];
            const addNewRowsResult = await postDao.addNewRows(connection, addNewRowsParams);
        }
        console.log(`${userIdResult[0].insertId}번 회원의 질문이 생성되었습니다`);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err){
        logger.error(`createUser Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//로그인 수정필요 + 로그아웃 만들어야함
exports.postSignIn = async function (email, password) {

    try {
        const emailRows = await userProvider.emailCheck(email); //이메일 확인

        if (emailRows[0].email != email) {
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }

        const passwordRows = await userProvider.passwordCheck(email);

        if (passwordRows[0].password != password) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        //console.log("이메일",emailRows[0].email, passwordRows)
        

        //일치하면 사용중인 회원인지 탈퇴한 회원인지 확인
        const userAccountRows = await userProvider.accountCheck(email);

        if (userAccountRows[0].userstatus === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } 

        let token = jwt.sign(
            { userIdx: userAccountRows[0].userIdx },
            secretkey,
            { expiresIn: "30d", subject: "User" }
        );

        return response(baseResponse.SUCCESS, token);
    } catch (err) {
        console.log(`App - postSignIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

