const express = require("./config/express");
const {logger} = require("./config/winston");
var router = express();

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../web-front', "index.html"));
})

require('dotenv').config();
const port = process.env.port;
express().listen(port);
logger.info(`${process.env.NODE_ENV } - API Server Start At port ${port}`);