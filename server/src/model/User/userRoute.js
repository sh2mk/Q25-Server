module.exports = function(app) {
    const user = require("./userController");
    // const jwtMiddleware = require(''); // TODO : middleware 처리할 것
    

    // 0. test API
    app.get('/members/test', user.getTest);

    /*
    const path = require("path");
    var express = require("express");
    var router = express.Router();

    var controller_main = require("../controllers/login-controller");


    //회원가입
    router.get("/signup", function(req, res){
        res.sendFile(path.join(__dirname, "../public/login.html")) //TODO: 경로 수정
    });
    router.post("signup", async function(req,res){
        var result = await controller_main.Signup(req,res);
        res.send(result);
    })

   */

}