"use strict";

const { json } = require("body-parser");
const Badge = require("../../model/Badge/Badge");
// 폴더나가서 폴더 나가서 model폴더 들어가서 record파일 들어가서 record.js를 사용하겠다


//회원가입
const process2={

    getjoin : async function(request,reponse){
        const badge=new Badge(request); // new 뒤에는 model에 있는 기능 적기
        const month_badge=await badge.getBadge();
       //console.log(month_badge);
        return response.json(month_badge);
    },

}



//hello: hello와 동일하게 저장된 것
module.exports={
   process2,
};