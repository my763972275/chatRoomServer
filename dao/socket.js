module.exports = function(io){
    io.on('connection',(socket) => {
        var users = {} // socket注册用户
        
        //用户登录注册
        socket.on('login',(id) => {
            console.log(id);
            //回复客户端
            socket.emit('msg',id);
            socket.name = id;
            users[id] = socket.id;
        })
        //用户一对一消息发送
        socket.on('msg',(msg,fromid,toid) => {
            socket.emit('msg',socket.id);
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