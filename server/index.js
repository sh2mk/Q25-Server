/*
"use strict";

const app=require("../server/config/express");
const port=process.env.port || 5000;

app.listen(port, function(){
    console.log('서버가 정상적으로 실행되었습니다.');
});
*/
const express = require("./config/express");
const {logger} = require("./config/winston");

const port = 8080; //원하는 port 번호로 수정
express().listen(port);
logger.info(`${process.env.NODE_ENV } - API Server Start At port ${port}`);