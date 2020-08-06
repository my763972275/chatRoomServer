// var db = require('../config/db');
var dbModel = require('../model/dbmodel')
var User = dbModel.model('User');
var Friend = dbModel.model('Friend');
var Group = dbModel.model('Group')
var GroupUser = dbModel.model('GroupUser')
var bcrypt = require('./bcryptjs')
var jwt = require('./jwt')


function update(data,update,res){
    User.findByIdAndUpdate(data,update,function(err,resu){
        if(err){
            // 修改失败
            res.send({status:500})
        }else{
            // 修改成功
            res.send({status:200})
        }
    })
}




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
    let wherestr
    if(data == 'yike'){
        wherestr = {};
    }else{
        //模糊查询
        wherestr = {$or:[{'name': {$regex:data}}, {'email': {$regex:data}}]}
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
    let wherestr
    if(data == 'yike'){
        wherestr = {}
    }else{
        wherestr = {'name':{$regex : data}}
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


// 用户详情
exports.userDetail = function(id,res){
    let wherestr = {'_id': id};
    let out = {'psw': 0};
    User.findOne(wherestr,out,function(err,result){
        if(err){
            res.send({status:500})
        }else{
            res.send({status:200,result})
        }
    })
}


//用户信息修改
exports.userUpdate = function(data,res){
    let updatestr = {}
    // 判断是否有密码项
    if(typeof(data.pwd != 'undefined')){
        // 有密码项
        User.find({'_id':data.id},{'psw':1},function(err,result){
            if(err){
                res.send({status:500})
            }else{
                if(result == ''){
                    res.send({status:400})
                }
                result.map(function(e){
                    const pwdMatch = bcrypt.verification(data.pwd,e.psw);
                    if(pwdMatch){
                        //如果为修改密码先加密
                        if(data.type == 'psw'){
                            let password = bcrypt.encryption(data.data);
                            updatestr[data.type] = password;
                            update(data.id,updatestr,res)
                        }else{
                            updatestr[data.type] = data.data;
                            // 邮箱验证
                            User.countDocuments(updatestr,function(err,resu){
                                if(err){
                                    res.send({status:500})
                                }else{
                                    //没有匹配项，可以修改
                                    if(resu == 0){
                                        update(data.id,updatestr,res)
                                    }else{
                                        //已存在
                                        res.send({status:300})
                                    }
                                }
                            })
                        }
                    }else{
                        // 密码匹配失败
                        res.send({status:400})
                    }
                })
            }
        })
    }else if(data.type == 'name'){
        updatestr[data.type] = data.data
        //如果是用户名先进行匹配
        User.countDocuments(updatestr,function(err,resu){
            if(err){
                res.send({status:500})
            }else{
                //没有匹配项，可以修改
                if(resu == 0){
                    update(data.id,updatestr,res)
                }else{
                    //已存在
                    res.send({status:300})
                }
            }
        })
    }else{
        //一般项修改
        updatestr[data.type] = data.data;
        update(data.id,updatestr,res)
    }
}


// 修改好友昵称
exports.friendMarkName = function(data,res){
    let wherestr = {'userID':data.uid,'friendID':data.fid};
    let updatestr = {'markname':data.name}
    Friend.updateOne(wherestr,updatestr,function(err,result){
        if(err){
            //修改失败
            res.send({status:500})
        }else{
            //修改成功
            res.send({status:200})
        }
    })
}

