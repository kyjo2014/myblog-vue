const postModel = require('../model/mongoModel')


/**
 * @description 
 * 
 * @export
 * @param {any} ctx 
 */
exports.list = async ctx => {
    ctx.body = await postModel.Blog.find().exec()
}

exports.findById = async ctx => {
    try {
        ctx.body = await postModel.Blog.findById(ctx.params.id).exec()
    } catch (error) {
        ctx.body = error
    }
}

exports.create = async ctx => {
    let body = ctx.request.body
    let {
        title: title,
        content: content,

    } = body
    await postModel.Blog.create({
        title,
        content
    })
    ctx.body = await postModel.Blog.find().exec()
}

exports.update = async ctx => {
    let body = ctx.request.body
    let {
        title: title,
        content: content,
    } = body
    try {
        ctx.body = await postModel.Blog.findByIdAndUpdate(ctx.params.id, {
            $set: {
                title: title,
                content: content
            }
        }).exec()
    } catch (error) {
        ctx.body = error
    }
}

exports.del = async ctx => {
     try {
        ctx.body = await postModel.Blog
    } catch (error) {
        ctx.body = error
    }
}