// controller에서는 형식적 validation 처리

const baseResponse = require("../../config/baseResponseStatus");

/*
    API NO.0
    API Name : Test API
    [GET] /members/test
*/
exports.getTest = async function (req,res) {
    return res.send(response(baseResponse.SUCCESS))
};