var dbServer = require('../dao/dbServer')
//引入邮箱发送方法
var emailServer = require('../dao/emailServer')

module.exports = function(app){
    app.get('/test',(req,res) => {
        dbServer.findUser(res);
    })

    //邮箱测试
    app.post('/mail', (req,res) => {
        let mail = req.body.mail;
        emailServer.emailSignUp(mail,res);
    })
}