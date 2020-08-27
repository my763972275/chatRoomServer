var dbserver = require('../dao/dbServer')

// 获取一对一聊天数据
exports.msg = function(req,res){
    let data = req.body;
    dbserver.msg(data,res)
}