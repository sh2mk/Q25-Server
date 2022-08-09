
const express = require("./config/express");
const {logger} = require("./config/winston");
const app = express();

require('dotenv').config(); //env 가져옴
const port = process.env.port; //원하는 port 번호로 수정
express().listen(5000); //port 5000
logger.info(`${process.env.NODE_ENV } - API Server Start At port ${port}`);