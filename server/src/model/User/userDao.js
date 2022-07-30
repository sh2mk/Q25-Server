
// 유저 생성
async function insertUserInfo(insertUserInfoParams) { // TODO : DB 연결 시 수정
    const insertUserInfoQuery = `
        INSERT INTO usertbl(nickName, email, password)
        VALUES (?, ?, ?);
    `;
    /*
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    */
    const insertUserInfoRow = [insertUserInfoQuery, insertUserInfoParams];
    return insertUserInfoRow;
}

// 이메일로 회원 조회
async function selectUserEmail(email) { //TODO : DB 연결시 수정
    const selectUserEmailQuery = `
        SELECT nickName, email
        FROM usertbl
        WHERE email = ?;
    `;
    // const [eamilRows] = await connection.query(selectUserEmailQuery, email);
    const [emailRows] = [selectUserEmailQuery, email];
    return emailRows;
}

module.exports = {
    insertUserInfo,
    selectUserEmail
};