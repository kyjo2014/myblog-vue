let mongoose = require('mongoose')
let AutoIncrement = require('mongoose-sequence');
let removeAttr = require('../utils/removeAttrFromDoc')
mongoose.Promise = global.Promise;

//当前已保存文章数量
let postAmount = 0

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
        default: ' '
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


//添加自增的id
post.plugin(AutoIncrement, {
    inc_field: 'id'
});
//设置返回文档内容时候同时获取虚属性
post.set('toJSON', {
    virtuals: true
})
post.set('toObject', {
    virtuals: true
})

//更改前更新日期
post.pre('save', function (next) {
    this.updatedAt = Date.now()
    this.markModified('updatedAt')
    this.find({}).count
    next()
})
//添加虚属性
post.virtual('summary').get(function () {
    if (this.content) {
        return this.content.slice(0, 10)
    } else {
        return ''
    }
})


//添加静态方法
post.statics = {
    listAll() {
        return this
            .find({})
            .select('-__v -_id')
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


//用户:普通用户
let user = new Schema({
    id: String,
    name: String,
    email: String,
    createAt: Date
})

//添加静态方法
user.statics = {
    listAll() {
        return this
            .find({})
            .select('-__v -_id')
            .exec()
    },
    findById(id) {
        return this
            .findOne({
                id: id
            })
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
            .exec()
    },
    getTotalCount() {
        return this
            .find({})
            .count()
            .exec()
    },
    async createGuest(info) {
        let count = await this.find({}).count().exec()
        Object.assign(info, {
            id: count++
        })
        return this.create(info)

    }

}


let User = mongoose.model('User', user)

//用户：管理人员
let host = new Schema({
    id: String,
    name: String,
    password: String,
    email: String,
    createAt: Date,
})

//添加静态方法
host.statics = {
    listAll() {
        return this
            .find({})
            .select('-__v -_id')
            .exec()
    },
    findById(id) {
        return this
            .findOne({
                id: id
            })
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
            .exec()
    },
    getTotalCount() {
        return this
            .find({})
            .count()
            .exec()
    },
    createGust(info) {

        return this.create
    }

}


let Host = mongoose.model('Host', host)



module.exports = {
    Blog,
    Book,
    User,
    Host
}