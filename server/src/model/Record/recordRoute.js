module.exports = function(app) {
    const record = require("./recordController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    

    
    // 3. record API
<<<<<<< Updated upstream

    //질문정보가져오기 
    app.get('/api/members/qnapage', record.getQuestion);

    //답변저장
    app.patch('/api/members/useranswer', record.patchRecord);
=======
    app.get('/members/record', record.getQuestion);
    app.post('/members/record', record.postRecord);
    app.get('/members/question/infor', record.getInfo);

    
>>>>>>> Stashed changes
  

};