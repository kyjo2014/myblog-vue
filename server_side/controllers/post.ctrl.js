const postModel = require('../model/mongoModel')

/**
 * @description 
 * 
 * @export
 * @param {any} ctx 
 */
exports.list = async ctx => {
    // ctx.body = 'list post api'
    ctx.body = await postModel.Blog.find().exec()
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