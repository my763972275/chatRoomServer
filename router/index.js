module.exports = function(app){
    app.get('/test',(req,res) => res.send('这里是test页面！'))
}