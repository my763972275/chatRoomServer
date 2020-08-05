// var db = require('../config/db');
var dbModel = require('../model/dbmodel')
var User = dbModel.model('User');
var Friend = dbModel.model('Friend');
var Group = dbModel.model('Group')
var GroupUser = dbModel.model('GroupUser')
var bcrypt = require('./bcryptjs')
var jwt = require('./jwt')

//新建用户
exports.buildUser = function(name,mail,pwd,res){
    // let { name, mail, psw} = req.body
    //密码加密
    let password = bcrypt.encryption(pwd);
    let data = {
        name:name,
        email:mail,
        psw:password,
        time:new Date()
    }
    let user = new User(data);
    user.save((err,result) => {
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200})
        }
    })
}

//匹配用户表元素个数(判断用户是否唯一)
exports.countUserValue = function(data,type,res){
    let str = {};
    str[type] = data    // 等同于wherestr = {'type':data }
    User.countDocuments(str,function(err,result){
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200},result)
        }
    })
}

//用户验证
exports.userMatch = function(data,pwd,res){
    let str = {$or:[{ 'name' : data },{ 'email' : data }]}
    let out = {'name': 1,'imgurl':1,'psw':1}
    User.find(str, out, function( err, result ){
        if(err){
            res.send({status:500})
        }else{
            if(result == ''){
               res.send({status:400})
            }
            result.map( function(e){
                const pwdMatch = bcrypt.verification(pwd,e.psw)
                if(pwdMatch){
                    let token = jwt.generateToken(e._id)
                    let back = {
                        id:e._id,
                        name: e.name,
                        imgurl:e.imgurl,
                        token:token
                    }
                    res.send({status:200,back})
                }else{
                    res.send({status:400})
                }
            })
            
        }
    })
}


//搜索用户
exports.searchUser = function(data,res){
    if(data == 'yike'){
        let wherestr = {};
    }else{
        //模糊查询
        let wherestr = {$or:[{'name': {$regex:data}}, {'email': {$regex:data}}]}
    }
    let out = {'name':1,'email':1,'imgurl':1}
    User.find(wherestr,out,function(err,result){
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200,result})
        }
    })
}


//用户匹配 判断是否为好友
exports.isFriend = function(uid,fid,res){
    let wherestr = {'userID':uid,'friendID':fid,'state':0}
    Friend.findOne(wherestr,function(err,result){
        if(err){
            res.send({status:500})
        }else{
            if(result){
                //是好友
              res.send({status:200,tip:1})  
            }else{
                //不是好友
                res.send({status:400})
            }
            
        }
    })
}

//搜索群
exports.searchGroup = function(data,res){
    if(data == 'yike'){
        let wherestr = {}
    }else{
        let wherestr = {'name':{$regex : data}}
    }
    let out = {
        'name':1,
        'imgurl':1
    }
    Group.find(wherestr,out,function(err,result){
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200,result})
        }
    })
}


//判断是否在群里
exports.isInGroup = function(uid,gid,res){
    let wherestr = {'userID':uid,'groupID':gid}
    Friend.findOne(wherestr,function(err,result){
        if(err){
            res.send({status:500})
        }else{
            if(result){
                //是在群内
              res.send({status:200,tip:1})  
            }else{
                //不在群内
                res.send({status:400})
            }
            
        }
    })
}