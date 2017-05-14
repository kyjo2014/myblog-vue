const userModel = require('../model/mongoModel')


/**
 * @description 
 * 根据用户id返回用户信息
 * @param {any} ctx 
 */
exports.findById = async ctx => {
    let user = await userModel.User.findById()
    return ctx.body = user
}


