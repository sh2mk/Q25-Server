const { USER_USEREMAIL_EMPTY } = require('../../../config/baseResponseStatus');

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO usertbl(nickName, email, password)
        VALUES (?, ?, ?);
    `;
    
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 이메일로 회원 조회. 회원가입 시 중복된 이메일 확인용
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
        SELECT nickName
        FROM userTBL
        WHERE email = ?;
    `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);

    return emailRows;
}

//로그인 이메일 확인
async function selectLoginEmail(connection, email) {
    const selectLoginEmailQuery = `
        SELECT email
        FROM userTBL
        WHERE email = ?;
    `;
    const [emailRows] = await connection.query(selectLoginEmailQuery, email);
    if(emailRows.length > 0){
    }
    else{
        let i = {email : null }
        emailRows.push(i);
    }
    console.log(emailRows)
    return emailRows;
}

async function selectUserPassword(connection, email){

    const selectUserPasswordQuery=`
        SELECT password
        FROM christmas25.usertbl
        WHERE email = ? ;
        `
    const [selectUserPassword] = await connection.query(selectUserPasswordQuery,email)
    return selectUserPassword;
}



//토큰 로그인
async function selectaccount(connection, email){

    const selectaccountQuery=`
        SELECT userIdx, userStatus
        FROM christmas25.usertbl
        WHERE email = ?
        `
    const [selectaccountRows] = await connection.query(selectaccountQuery,email)
    return selectaccountRows;
}

//토큰 가져오기
async function seletUserToken(connection, userIdx){

    const seletUserTokenQuery=`
        SELECT tokenIdx
        FROM christmas25.tokentbl
        WHERE userIdx = ?
        `
    const [seletUserToken] = await connection.query(seletUserTokenQuery,userIdx)
    return seletUserToken;
}

//토큰 저장
async function InsertUserToken(connection, userIdx, tokenIdx){

    const InsertUserTokenQuery=`
        INSERT INTO tokentbl(tokenIdx, userIdx)
        VALUES (?, ?);
        `
    const [insertUserToken] = await connection.query(InsertUserTokenQuery,[tokenIdx, userIdx])
    return insertUserToken;
}


module.exports = {
    insertUserInfo,
    selectUserEmail,
    selectUserPassword,
    selectaccount,
    seletUserToken,
    InsertUserToken,
    selectLoginEmail
};