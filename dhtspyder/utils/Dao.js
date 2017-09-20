const mongoose = require('mongoose')

mongoose.set('debug',true)

mongoose.connect('mongodb://127.0.0.1:27017/spider')

let db = mongoose.connection

//检测是否成功连接数据库
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback => {
    console.log('mongodb opened')
})

