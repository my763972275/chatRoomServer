//用户登录
var dbServer = require('../dao/dbServer');


// 登录功能
exports.signIn = function(req,res){
    let {data,pwd} = req.body;
    dbServer.userMatch(data,pwd,res);
}