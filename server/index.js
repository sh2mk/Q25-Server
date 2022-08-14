const express = require("./config/express");
const {logger} = require("./config/winston");

require('dotenv').config();
const port = process.env.port;
express().listen(5000);
logger.info(`${process.env.NODE_ENV } - API Server Start At port ${port}`);