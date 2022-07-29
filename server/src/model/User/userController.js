// controller에서는 형식적 validation 처리

const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const userService = require("../User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/*
    API NO.0
    API Name : Test API
    [GET] /members/test
*/
exports.getTest = async function (req,res) {
    return res.send(response(baseResponse.SUCCESS));
};