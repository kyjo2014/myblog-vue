const postModel = require('../model/mongoModel')


/**
 * @description 
 * 返回所有文章
 * @export
 * @param {any} ctx 
 */
exports.list = async ctx => {
    let collection = await postModel.Blog.listAll()
    return ctx.body = collection
}

/**
 * @description 
 * 按照文章id返回文章
 * @param {any} ctx 
 */
exports.findById = async ctx => {
    try {
        return ctx.body = await postModel.Blog.findByPostId(id)
    } catch (error) {
        return ctx.body = error
    }
}

/**
 * @description 
 * 新建文章
 * @param {any} ctx 
 */
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

    return ctx.body = await postModel.Blog.listAll()
}
/**
 * @description 
 * 更新文章
 * @param {any} ctx 
 */
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

/**
 * @description 
 * 删除文章
 * @param {any} ctx 
 */
exports.del = async ctx => {
    try {
        ctx.body = await postModel.Blog.findByIdAndRemove(ctx.params.id).exec()
    } catch (error) {
        ctx.body = error
    }
}