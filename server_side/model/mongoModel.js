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
mongoose.connect('mongodb://127.0.0.1:27017/test')
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
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }] //标签

    // sort: {     type: Schema.Types.ObjectId required: true }
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
    next()
})

//添加虚属性
post
    .virtual('summary')
    .get(function () {
        if (this.content) {
            return this
                .content
                .slice(0, 10)
        } else {
            return ''
        }
    })

//添加静态方法
post.statics = {
    listAll() {
        return this
            .find({})
            .populate('tags')
            .select('-__v -_id')
            .exec()
    },
    findByPostId(id) {
        return this
            .findOne({
                id: id
            })
            .populate('tags')
            .select('-summary')
            .exec()
    },
    //获取post列表
    fetchByPage(page = 1, post_per_page = 10) {
        return this
            .find({})
            .populate('tags', 'name tid -_id')
            .sort({
                'createAt': -1
            })
            .select('-content')
            .skip(post_per_page * (page - 1))
            .limit(post_per_page)
            .exec()
    },
    getTotalCount() {
        return this
            .find({})
            .count()
            .exec()
    },
    createWithTags: async(post) => {
        try {

            let {
                title,
                content,
                tags
            } = post
            let nTagsPromise = tags.map(async(tag) => {
                let tagId = await Tag
                    .findOne({
                        name: tag
                    })
                    .exec()
                if (!tagId) {
                    tagId = await Tag.create({
                        name: tag
                    })
                }

                return tagId['_id']
            })
            let nTags = await Promise.all(nTagsPromise)
            await Blog.create({
                title,
                content,
                tags: nTags
            })
        } catch (error) {
            cosnole.log(error)
        }
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
        let count = await this
            .find({})
            .count()
            .exec()
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
    createAt: Date
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
    fetchByPage(page = 1, perPage = POST_PER_PAGE) {
        return this
            .find({})
            .sort({
                'createAt': -1
            })
            .skip(perPage * (page - 1))
            .limit(perPage)
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

//文章标签
let tag = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 8
    },
    tid: {
        type: Number,
        unique: true
    }
})

//添加自增的id
tag.plugin(AutoIncrement, {
    inc_field: 'tid'
});

tag.statics = {
    listAll() {
        return this
            .find({})
            .select('-__v -_id')
            .exec()
    }
}

let Tag = mongoose.model('Tag', tag)

//文章标签
let sort = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 8
    },
    tid: {
        type: Number,
        unique: true
    }
})


let Sort = mongoose.model('Sort', sort)
module.exports = {
    Blog,
    Book,
    User,
    Host,
    Sort
}