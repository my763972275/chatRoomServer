var dbserver = require('../dao/dbServer')
var email = require('../dao/emailServer')
//用户注册
exports.signUp = function(req,res){
    let {name,mail,pwd} = req.body;
    // res.send({name,mail,pwd})
    // 发送邮件
    // email.emailSignUp(mail)
    dbserver.buildUser(name,mail,pwd,res)
}


//用户或邮箱是否占用判断
exports.judgeValue = function(req,res){
    let { data,type } = req.body;
    // res.send({data,type})
    dbserver.countUserValue(data,type,res)
}