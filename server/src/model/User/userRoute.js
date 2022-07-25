module.exports = function(app) {
    const user = require("./userController");

    // 0. test API
    app.get('//members/test');
}