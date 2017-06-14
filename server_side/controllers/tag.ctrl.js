const tagModel = require('../model/mongoModel')


/**
 * @description 
 * 返回所有文章
 * @export
 * @param {any} ctx 
 */
exports.list = async ctx => {
    let collection = await tagModel.Tag.listAll()
    return ctx.body = {
        code: '200',
        message: '成功获取',
        data: collection
    }
}

/**
 * @description 
 * 按照文章id返回文章
 * @param {any} ctx 
 */
exports.findById = async ctx => {
    let res = {
        code: '200',
        message: '查找成功'
    }
    try {
        res.data = await tagModel.Tag.findByPostId(id)
    } catch (error) {
        res = {
            code: '400',
            message: '查找失败，出现错误',
            data: error
        }
    }

    return ctx.body = res
}

/**
 * @description 
 * 新建标签
 * @param {any} ctx 
 */
exports.create = async ctx => {
    let body = ctx.request.body
    let {
        name
    } = body
    await tagModel.Tag.create({
        name
    })
    return ctx.body = await tagModel.Tag.listAll()
}


/**
 * @description 
 * 文章格式验证
 * @param {any} title 
 * @param {any} content 
 */
function postValid(title, content) {
    const TITLE_REG = '' //    
}


