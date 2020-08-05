var dbServer = require('../dao/dbServer');
//引入邮箱发送方法
var emailServer = require('../dao/emailServer');
var signup = require('../server/signup');
var signin = require('../server/signin');


module.exports = function(app){
    app.get('/test',(req,res) => {
        dbServer.findUser(res);
    })

    // 邮箱测试
    app.post('/mail', (req,res) => {
        let mail = req.body.mail;
        emailServer.emailSignUp(mail,res);
    })

    // 注册页面
    // 注册
    app.post('/signup/add',(req,res) => {
        signup.signUp(req,res);
    })

    // 判断用户名是否重复
    app.post('/signup/judge',(req,res) => {
        signup.judgeValue(req,res)
    })

    // 用户登录
    app.post('/signin/match',(req,res) => {
        signin.signIn(req,res);
    })
    //token 测试
    app.post('/signin/test',(req,res) => {
        signin.test(req,res);
    })
}