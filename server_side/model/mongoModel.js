let mongoose = require('mongoose')
mongoose.Promise = global.Promise;

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



//文章
let post = new Schema({
    id: Number, //博客id
    title: String, //文章标题
    author: String, //文章作者
    content: String, //文章内容
    createAt: Date, //发布时间
    updatedAt: {
        type: Date,
        default:Date.now()
    }, //更新时间
    readAmount: Number, //阅读量
    tags: [Schema.Types.ObjectId]//标签
    //TODO：增加评论功能
})
let Blog = mongoose.model('Blog', post)

//书本
let book = new Schema({
    title: String,
    link: String,
    info: String
})
let Book = mongoose.model('Book', book)


//用户
let user = new Schema({
    id: String,
    name: String,
    password: String,
    email: String,
    createAt: Date
})
let User = mongoose.model('User', user)



module.exports = {
    Blog,
    Book,
    User
}