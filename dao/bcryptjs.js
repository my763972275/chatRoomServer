var bcrypt = require('bcryptjs');
//生成hash密码
exports.encryption = function(e){
    //生成一个随机数
    let salt = bcrypt.genSaltSync(10);
    //生成hash密码
    let hash = bcrypt.hashSync(e,salt);
    return hash;
}

//解密
exports.verification = function(e,hash){
    let verif = bcrypt.compareSync(e,hash);
    return verif;
}