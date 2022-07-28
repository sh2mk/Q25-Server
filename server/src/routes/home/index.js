//라우터=>도메인으로 들어왔을 때 클라이언트의 요청을 연결
//"/login"=>요청 , function()=>기능(컨트롤러 영역)

"use strict";

const express = require('../../config/express');
//const {logger} = require('winston');
const router=express.Router();


const checkToken=require("../middlewares/authorization");
const user_ctrl=require("./user.ctrl");
const todo_ctrl=require("./todo.ctrl");
const schedule_ctrl=require("./schedule.ctrl");
const diary_ctrl=require("./diary.ctrl");
const menstruation_ctrl=require("./menstruation.ctrl");
const board_ctrl=require("./board.ctrl");
const badge_ctrl=require("./badge.ctrl");
const qa_ctrl=require("./qa.ctrl");


// 컨트롤러작성
const record_ctrl=require("./record.ctrl");


//------------------------------------------------------------------------------------------------


//라우터작성
// router. 메소드 ( "api경로" , 컨트롤러.process.기능명칭);

//router.post("/join/new" , record_ctrl.)

router.get("/members/test", getTest);


//예시
// router.get("/QA", checkToken.auth.check, qa_ctrl.process.getQA);
// router.post("/QA", checkToken.auth.check, qa_ctrl.process.saveQA);
// router.get("/QA/calendar", checkToken.auth.check, qa_ctrl.process.getQAcalendar);

module.exports=router;