
// 모든 유저 조회
async function selectUser(connection){
    const selectUserListQuery = `
        SELECT email, nickname
        FROM userTBL
    `
}

module.exports = {
    selectUser,
};