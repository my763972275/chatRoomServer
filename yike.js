const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./router/index')(app)
var jwt = require('./dao/jwt')

//设置允许跨域访问该服务
app.all('*',function (req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By','3.2.1')
    res.header('Content-Type','application/json;charset=utf-8');
    if(req.method == 'OPTIONS'){
        res.sendStatus(200);
    }else{
        next();
    }
    
});


//token 判断
app.use(function(req,res,next){
    if(typeof(req.body.token) != 'undefined'){
        //处理token匹配
        let token = req.body.token;
        let tokenMatch = jwt.verifyToken(token);
        if(tokenMatch == 1){
            //通过验证
            next()
        }else{
            //返回300 直接跳转到登录页
            res.send({status:300})
        }
    }else{
        next();
    }
})



//404页面
app.use(function(req,res,next){
   let err = new Error('Not Found');
   err.status = 404;
   next(err)
});

//出现错误处理
app.use(function(err,req,res,next){
    res.status(err.status || 500)
    res.send(err.message);
})



// 连接服务器
app.listen(port,() => console.log('服务器连接成功！'))