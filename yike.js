const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.json());
require('./router/index')(app)
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