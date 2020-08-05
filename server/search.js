var dbserver = require('../dao/dbServer')


//用户搜索
exports.searchUser = function(req,res){
    let data = req.body.data;
    dbserver.searchUser(data,res);
}

//判断是否为好友
exports.isFriend = function(params) {
    
}