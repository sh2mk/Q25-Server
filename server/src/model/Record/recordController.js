// controller에서는 형식적 validation 처리

const jwtMiddleware = require("../../../config/jwtMiddleware");
const recordProvider = require("../Record/recordProvider");
const recordService = require("../Record/recordService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/*
    API NO.0
    API Name : Test API
    [GET] /members/record
    이메일, 질문번호를 주면 질문번호, 질문내용, 질문이미지, 답변 
*/
exports.getQuestion = async function (req,res) {
    /*
        body : email, qnum
    */
    console.log("엥");
   const { email, qnum } = req.body;
   console.log( email, qnum)
   const getQuestionResponse = await recordService.getQuestion(
    email,
    qnum
    );

    return res.send(getQuestionResponse);
};

//저장
exports.postRecord = async function (req,res) {
    /*
        body : email, qnum, content
    */
   const { email, qnum, content } = req.body;

   const postRecordResponse = await recordService.postRecord(
    email, 
    qnum, 
    content
    );

    return res.send(response(postRecordResponse));
};

