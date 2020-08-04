//引用发送邮件插件
var nodemailer = require('nodemailer');
//引入证书文件
var credentials = require('../config/credentials')


//创建传输方式
var transporter = nodemailer.createTransport({
    service:'qq',
    host:"smtp.qq.com",
    port:465, //端口号
    secure:true, //true for 465， false for other ports
    auth:{
        user:credentials.qq.user,
        pass:credentials.qq.pass
    }
})


//注册发送邮件给用户
exports.emailSignUp = function(email,res){
    // 生成随机验证码
    var code = parseInt(Math.random()*1000000)
    let options = {
        from : '763972275@qq.com',
        to : email,
        subject : '感谢您在yike注册',
        html : `<span>yike欢迎您的加入！您的验证码为${code}</span>`
    };

    //发送邮件
    transporter.sendMail(options,function(err,msg){
        if(err){
            console.log(err)
        }else{
            res.send('验证码发送成功')
            console.log('邮箱发送成功！')
        }
    })

}