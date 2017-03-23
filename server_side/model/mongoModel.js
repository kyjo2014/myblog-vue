let mongoose = require('mongoose')


//建立数据库链接
mongoose.connect('mongodb://127.0.0.1:27017')
let db = mongoose.connection

//检测是否成功连接数据库
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback => {
    console.log('mongodb opened')
})


//创建Schema
const Schema = mongoose.Schema

