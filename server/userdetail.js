var dbserver = require('../dao/dbServer')

//详情
exports.userDetail = function(req,res){
    let id = req.body.id;
    dbserver.userDetail(id,res)
}

//信息修改
exports.userUpdate = function(req,res){
    let data = req.body;
    dbserver.userUpdate(data,res)
}

//修改好友昵称
exports.friendMarkName = function(req,res){
    let data = req.body;
    dbserver.friendMarkName(data,res)
}