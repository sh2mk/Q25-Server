"use strict";

//모듈
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();

//라우팅
const home=require("./src/routes/home");

app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.static("./src/databases"));
app.use("/api", home); //use=> 미들웨어 등록해주는 메소드

module.exports=app;