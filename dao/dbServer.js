// var db = require('../config/db');
var dbModel = require('../model/dbmodel')
var User = dbModel.model('User')
var bcrypt = require('./bcryptjs')


//新建用户
exports.buildUser = function(req,res){
    let {name,mail,pwd} = req.body
    //密码加密
    let password = bcrypt.encryption(req.pwd);
    let data = {
        
    }
}