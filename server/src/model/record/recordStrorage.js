"use strict"

const db=require("../../config/db"); //db 위치


class BadgeStorage {

    //뱃지 조회 정보 출력 
    static getBadge(id, pw){
        return new Promise((resolve, reject)=>{
            db.query(`SELECT badge_no, goal_count, challenge_y_n as challenge 
                      FROM capstone_design.memberbadge 
                      WHERE member_id=?`,
                      [id], function(err, list){
                
                if(err) reject(err);
                    else {
                        resolve(list);
                    };
            });
        
        });
    }

    static saveUserInfo(userInfo){
        return new Promise((resolve, reject)=>{
            const query="INSERT INTO capstone_design.member(member_id, pw, nickname, name, email) VALUES(?, ?, ? , ?, ?)";
            db.query(query, [userInfo.id, userInfo.password, userInfo.nickname, userInfo.name, userInfo.email] ,(err)=>{
                if(err) reject(err);
                else resolve({success : true});
            });
        });
    }


}


module.exports=BadgeStorage;