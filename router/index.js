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
var friend = require('../server/friend')
var index = require('../server/index')

module.exports = function(app){
    app.get('/test',(req,res) => {
        res.send('11111')
        // dbServer.findUser(res);
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
    //好友昵称修改
    app.post('/user/getmarkname',(req,res) => {
        user.getMarkName(req,res)
    })

    app.post('/user/update',(req,res) => {
        user.userUpdate(req,res)
    })


    //申请好友
    app.post('/friend/applyfriend',(req,res) => {
        friend.applyFriend(req,res)
    })

    //申请状态修改
    app.post('/friend/updateFriendState',(req,res) => {
        friend.updateFriendState(req,res)
    })

    //拒绝好友或删除好友
    app.post('/friend/deletefriend',(req,res)=>{
        friend.deleteFriend(req,res)
    })

    //主页
    //获取好友
    app.post('/index/getfriend',(req,res)=>{
        index.getFriend(req,res)
    })

    //获取最后一条消息
    app.post('/index/getlastmsg',(req,res)=>{
        index.getLastMsg(req,res)
    })

    //获取未读消息数
    app.post('/index/unreadmsg',(req,res) => {
        index.unreadMsg(req,res)
    })

    //好友消息标已读
    app.post('/index/updatemsg',(req,res) => {
        index.updateMsg(req,res)
    })

    //获取群
    app.post('/index/getgroup',(req,res) => {
        index.getGroup(req,res)
    })

    //获取最后一条群消息
    app.post('/index/getlastgroupmsg',(req,res) => {
        index.getLastGroupMsg(req,res)
    })

    //群消息标为已读
    app.post('/index/updategroupmsg',(req,res) => {
        index.updateGroupMsg(req,res)
    })
}