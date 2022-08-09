
// 질문, 답변가져오기 (답은 null일수도있음)
async function SelectQuestion(connection, email,qnum) {
    const selectQuestion = `
        SELECT questionIdx, content, CONCAT('http://localhost:3001/images/', questionImg)
        FROM christmas25.questiontbl
        WHERE questionIdx = ?
    `;
    const [selectquestionRow] = await connection.query(
        selectQuestion,
        qnum
    );
//DB수정해서 IDX 없애고 이메일넣던가해야함
    const selectAnswer = `
    SELECT answer
    FROM christmas25.pagetbl
    WHERE questionIdx = ? AND userIdx = ? 
    `;
    const [selectAnswerRow] = await connection.query(
        selectAnswer,
        [qnum,
        email]
    );


    let selectQARow= {selectquestionRow, selectAnswerRow };

    return selectQARow;
}


// 답 저장하기
async function InsertAnswer(connection, email,qnum,content) {
    const insertAnswerQuery = `
    UPDATE christmas25.pagetbl
    SET answer=?
    WHERE userIdx=? AND questionIdx=? 
    `;
    
    const insertAnswetRow = await connection.query(
        insertAnswerQuery,
        [content,
        email,
        qnum]
    );

    return insertAnswetRow;
}

//회원가입 시 db 추가
async function addNewRows(connection, addNewRowsParams){
    const addNewRowsQuery = `
        INSERT INTO pageTBL(userIdx, questionIdx)
        VALUES (?, ?);
    `;
    const addNewRowsRow = await connection.query(addNewRowsQuery, addNewRowsParams);

    return addNewRowsRow;
};

//기준 기간 가져오기
async function getTimeCriteria(connection, questionIdx){
    const getTimeCriteriaQuery = `
        SELECT openTime
        FROM questionTBL
        WHERE questionIdx = ?;
    `;

    const TimeCriteria = await connection.query(getTimeCriteria, questionIdx);
    return TimeCriteria;
};

//시간 돼서 질문 열리면 opened=1로 변경
async function updateOpenStatus(connection, userQIdx) {
    const updateOpenStatusQuery = `
        UPDATE pageTBL
        SET opened = '1'
        WHERE userQIdx = ?;
    `;

    const updateOpenStatusRow = await connection.query(updateOpenStatusQuery, userQIdx);

    return updateOpenStatusRow[0];
};

module.exports = {
    SelectQuestion,
    InsertAnswer,
    addNewRows,
    getTimeCriteria,
    updateOpenStatus
};