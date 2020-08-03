const express = require('express')
const app = express()
const port = 3000


app.get('/',(req,res) => res.send('nihao!'))


//设置允许跨域访问该服务
app.all('*',function (req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Content-Type','application/json;charset=utf-8');
    next();
});

require('./router/index')(app)

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