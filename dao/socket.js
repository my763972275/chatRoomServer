let dbserver = require('./dbServer')
module.exports = function(io){
    var users = {} // socket注册用户
    io.on('connection',(socket) => {
        
        //用户登录注册
        socket.on('login',(id) => {
            console.log(id);
            //回复客户端
            socket.name = id;
            users[id] = socket.id;
            socket.emit('login',socket.id);
        })
        //用户一对一消息发送
        socket.on('msg',(msg,fromid,toid) => {
            console.log(users[toid],users)
            // 修改好友最后通讯时间
            dbserver.upFriendLastTime(fromid,toid)
            // 存储一对一消息
            dbserver.insertMsg(fromid,toid,msg.message,msg.types)
            if(users[toid]){
                socket.to(users[toid]).emit('msg',msg,fromid,0)
            }
            // 发送给自己
            socket.emit('msg',msg,fromid,1);
        })
        //用户离开
        socket.on('disconnecting',() => {
            // const rooms = Object.keys(socket.rooms);
            if(users.hasOwnProperty(socket.name)){
                delete users[socket.name]
            }
            console.log(socket.id + '离开')
        })
    })
}