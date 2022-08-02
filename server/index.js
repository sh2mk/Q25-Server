
const express = require("./config/express");
const {logger} = require("./config/winston");

require('dotenv').config()
const port = process.env.port; //원하는 port 번호로 수정
express().listen(port);
logger.info(`${process.env.NODE_ENV } - API Server Start At port ${port}`);