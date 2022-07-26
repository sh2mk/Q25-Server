"use strict"
//User=데이터를 가지고 검증 및 조작하는 역할만 수행
//jwt=header의 인코딩 값과 payload의 인코딩 값을 합친 해시값

/*
const BadgeStorage=require("./BadgeStorage");

const BadgeInfo = require("./BadgeInfo");


function badgelist (Info, memberbadge, complete){
    //뱃지정보 , 회원의 뱃지달성정보, 완성도 리스트

    let badges = [];

    let dataList = [];
    for (let data of memberbadge){
      dataList.push(data.challenge);
    };

    for(let i = 0 ; i < 15 ; i++){

        //달성했다면 골카운트 = 파이널카운트 //db에는 계속 상승하도록 해놓음
        if(memberbadge[i].goal_count >= Info[i].final_count ){
            memberbadge[i].goal_count = Info[i].final_count;
        }

        if(dataList[i] === 'true' ){
            memberbadge[i].challenge = true;
        }
        else {
            memberbadge[i].challenge = false;
        }


        const item = { badge_no : Info[i].Badge_no ,
            badge_name : Info[i].badge_name ,
           // badge_url : Info[i].badge_url , // 이미지 나중에 구하기
            challenge : memberbadge[i].challenge, // true / flase : true이면 메인 화면에 출력?      
            goal_count : memberbadge[i].goal_count, //  14      
            final_count : Info[i].final_count, //  100      
            is_complete : complete[i].is_complete,// true / false      
            description : Info[i].description };

            badges.push(item);
    }

        
    let month_badges = { badges : badges};

    return month_badges;
};

class Badge{
    constructor(body){
        this.body=body;
    }

    //조회
    async getBadge(){
        try{
            let complete = [];
            const Info = await BadgeInfo.Info(); // 뱃지번호
            const memberbadge = await BadgeStorage.getBadge(this.body.userId); // 뱃지번호
            //const memberbadge = await recordStorage.getBadge(this.body.userId); // 뱃지번호
            

            for(let i = 0 ; i <15 ; i++){ //달성도 확인
                if(Info[i].final_count <= memberbadge[i].goal_count){
                    let a = { is_complete : true}
                    complete.push(a)
                }
                else{
                    let a = { is_complete : false}
                    complete.push(a)
                }
            }

            const badges = new badgelist(Info, memberbadge, complete);

            return badges;
        }
            
        catch(Err){
            return{succes : false, message : Err}
        }
    }



   
}


module.exports=Badge;

*/

