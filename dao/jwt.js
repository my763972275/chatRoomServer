//token

//引入token
var jwt = require('jsonwebtoken');
var secret = 'yikeshiguang';
//生成token
exports.generateToken = function(e){
    let payload = {id:e,time:new Date()} 
    let token = jwt.sign(payload,secret,{ expiresIn: 60 * 60 * 24 * 2})

    return token;
}

//解码
exports.verifyToken = function(e){
    let payload = jwt.verify(e,secret);
    
    return payload;
}