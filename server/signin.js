//用户登录
var dbServer = require('../dao/dbServer');
var jwt = require('../dao/jwt')

// 登录功能
exports.signIn = function(req,res){
    let {data,pwd} = req.body;
    dbServer.userMatch(data,pwd,res);
}

exports.test = function(req,res){
    let token = req.body.token;
    let jg = jwt.verifyToken(token);
    res.send(jg)
    // dbServer.userMatch(data,pwd,res)
}