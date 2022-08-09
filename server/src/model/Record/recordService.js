// create, update, delete 등 조회 이외의 작업 처리
const {logger} = require("../../../config/winston");
const { pool } = require("../../../config/database");

const recordProvider = require("./recordProvider");
const recordDao = require("./recordDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");


// 선물상자 누르면 보내줄 정보 - email qnum은 다른걸로 바꾸기
exports.getQuestion = async function (email, qnum) {
    try{
        // 이메일에 있는 질문 번호 가져오기
        const questionRows = await recordProvider.getQuestion(email,qnum);

        console.log(questionRows);
        const connection = await pool.getConnection(async (conn) => conn);
        connection.release();

        return response(baseResponse.SUCCESS, questionRows);

    } catch (err){
        logger.error(`getQuestion Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 답변 작성시 저장해야할 정보
exports.postRecord = async function (email, qnum, content) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        // 이메일에 있는 질문 번호 가져오기
        const recordRows = await recordProvider.postRecord(email,qnum,content);
        console.log(`recordRows : ${recordRows}`);

        //시간 비교
        const currentTime = new Date();
        console.log(`current Date : ${currentTime}`);
        const timeCriteria = await postDao.getTimeCriteria(connection, questionIdx);
        
        if (timeCriteria >= currentTime){
            const updateOpenStatusResult = await recordDao.updateOpenStatus(connection, userQIdx);
        }
        return response(baseResponse.SUCCESS, recordRows);

    } catch (err){
        logger.error(`postRecord Service error\n : ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
};
