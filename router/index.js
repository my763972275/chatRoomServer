var dbServer = require('../dao/dbServer');
// 引入邮箱发送方法
var emailServer = require('../dao/emailServer');
// 注册页面
var signup = require('../server/signup');
// 登录页面
var signin = require('../server/signin');
// 搜索页面
var search = require('../server/search');
// 用户详情页面的服务
var user = require('../server/userdetail')

module.exports = function(app){
    app.get('/test',(req,res) => {
        dbServer.findUser(res);
    })

    // 邮箱测试
    app.post('/mail', (req,res) => {
        let mail = req.body.mail;
        emailServer.emailSignUp(mail,res);
    })

    /**
     * 注册页面
     */
    // 注册
    app.post('/signup/add',(req,res) => {
        signup.signUp(req,res);
    })

    // 判断用户名是否重复
    app.post('/signup/judge',(req,res) => {
        signup.judgeValue(req,res)
    })

    /**
     * 登录页面
     */
    // 用户登录
    app.post('/signin/match',(req,res) => {
        signin.signIn(req,res);
    })
    // token 测试
    app.post('/signin/test',(req,res) => {
        // signin.test(req,res);
        res.send('这里token正确')
    })

    /**
     * 搜索页面
     */
    // 搜索用户
    app.post('/search/user',(req,res) =>{
        search.searchUser(req,res)
    })

    // 判断是否为好友
    app.post('/search/isfriend',(req,res) => {
        search.isFriend(req,res)
    })

    // 用户群
    app.post('/search/group',(req,res) => {
        search.searchGroup(req,res)
    })

    // 判断是否在群内
    app.post('/search/isingroup',(req,res) => {
        search.isInGroup(req,res)
    })

    /**
     * 用户详情页
     */
    //用户详情
    app.post('/user/detail',(req,res) =>{
        user.userDetail(req,res);
    })

    //好友昵称修改
    app.post('/user/markname',(req,res) => {
        user.friendMarkName(req,res)
    })

    app.post('/user/update',(req,res) => {
        user.userUpdate(req,res)
    })
}