let mongoose = require('mongoose')
mongoose.Promise = global.Promise;


//summary长度
const SUMMARY_LEN = 10;

//每页文章数量
const POST_PER_PAGE = 5

//管理员账号
const ADMIN_ID = 'admin'
//开启debug模式
mongoose.set('debug', true)

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
    title: {
        type: String,
        required: true
    }, //文章标题
    author: {
        type: String,
        required: true,
        default: ADMIN_ID
    }, //文章作者
    content: {
        type: String,
        default: ''
    }, //文章内容
    createAt: {
        type: Date,
        default: Date.now()
    }, //发布时间
    updatedAt: {
        type: Date,
        default: Date.now()
    }, //更新时间
    readAmount: Number, //阅读量
    tags: [Schema.Types.ObjectId] //标签
    //TODO：增加评论功能
})
//更改前更新日期
post.pre('save', next => {
    this.updatedAt = Date.now()
    this.markModified('updatedAt')
    next()
})
//添加虚属性
post.virtual('summary').get(function () {
    console.log('finding')
    console.log(this)
    return this.content
})

//添加静态方法
post.statics = {
    listAll() {
        this.findOne({}).exec((err, doc) => {
            console.log(doc.summary)
        })
        return this
            .find({})
            .select('-content')
            .exec()
    },
    findByPostId(id) {
        return this
            .findOne({
                id: id
            })
            .select('-summary')
            .exec()
    },
    fetchByPage(page) {
        return this
            .find({})
            .sort({
                'createAt': -1
            })
            .skip(POST_PER_PAGE * (page - 1))
            .limit(POST_PER_PAGE)
            .select('-summary')
            .exec()
    },
    getTotalCount() {
        return this
            .find({})
            .count()
            .exec()
    }

}

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