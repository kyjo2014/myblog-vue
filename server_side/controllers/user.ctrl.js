const userModel = require('../model/mongoModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const hostInfo = require('../conf/mainConf')

exports.list = async ctx => {
    let items = []
    try {
        items = await userModel
            .User
            .find({})

    } catch (error) {
        ctx.body = {
            code: 500,
            message: '服务器出错'
        }
    }
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: items
    }
}

/**
 * @description
 * 根据用户id返回用户信息
 * @param {any} ctx
 */
exports.findById = async ctx => {
    let user = await userModel
        .User
        .findById()
    return ctx.body = user
}

/**
 * 获取管理员的自我介绍
 *
 * @param {any} ctx
 */
exports.me = async ctx => {}

/**
 * @description
 * 新建用户
 * @param {any} ctx
 */
exports.create = async ctx => {
    let body = ctx.request.body || {}
    let {
        email = "undefined",
        nickname = "undefined"
    } = body;

    if (guestValid(email, nickname)) {
        let user = await userModel
            .User
            .findOne({email: email})
            .exec()
        if (user == null) {
            let message = await userModel
                .User
                .createGuest({name: nickname, email})
            return ctx.body = {
                code: '200',
                message: message
            }
        }

    }
    return ctx.body = {
        code: '403',
        message: '注册失败'
    }
}

/**
 * @description
 * 用户格式验证器
 * @param {any} email
 * @param {any} nickname
 * @returns
 */
function guestValid(email, nickname) {
    const E_MAIL_REG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const NICK_NAME_REG = /[a-zA-Z0-9_]{3,16}/
    return E_MAIL_REG.test(email) && NICK_NAME_REG.test(nickname)
}

/**
 * @description
 * 博主身份验证器
 * @param {any} id 长度为 3-16的字符串
 * @param {any} passward 长度为6-21 的字符串,包含字母与数字
 * @returns
 */
function hostValid(id, passward) {
    const ID_REG = /[a-zA-Z0-9_]{3,16}/
    const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
    return ID_REG.test(id) && PWD_REG.test(passward)
}

/**
 * @description
 * 登录
 * @param {any} ctx
 */
exports.login = async ctx => {
    let body = ctx.request.body || {}
    let {
        password: pwd = "undefined",
        id = "undefined",
        email = "undefined",
        nickname = "undefined"
    } = body
    // var id = 'host' var pwd = 'abc123456' var email = 'test@' var nickname =
    // "123"
    if (hostValid(id, pwd)) {
        if (id === hostInfo['id'] && pwd === hostInfo['pwd']) {
            let token = jwt.sign({
                id,
                pwd
            }, hostInfo.secretKey, {
                expiresIn: 60 * 60
            })
            return ctx.body = {
                code: '200',
                message: '登录成功',
                data: {
                    token,
                    isHost: true
                }
            }
        } else {
            return ctx.body = {
                code: '403',
                message: '登陆失败'
            }
        }
    } else if (guestValid(email, nickname)) {
        let user = await userModel
            .User
            .findByEmail(email)
        if (user.hasOwnPorperty('nickname')) {

            if (user['nickname'] === nickname) {
                let token = jwt.sign({
                    email,
                    nickname
                }, hostInfo.secretKey, {
                    expiresIn: 60 * 60
                })
                return ctx.body = {
                    code: '200',
                    message: '登录成功',
                    data: {
                        token,
                        isHost: false
                    }
                }
            }
        }
    }
    return ctx.body = {
        code: '403',
        message: '登陆失败'
    }

}

exports.del = async ctx => {
    let {id: userID} = ctx.params //获取删除的用户的id
    let user = await userModel
        .User
        .findOneAndRemove({id: userID})
    if (user) {
        res = {
            code: '200',
            message: '删除用户成功',
            data: {
                userInfo: user
            }
        }
    } else {
        res = {
            code: '403',
            message: '删除用户失败'
        }
    }
    return ctx.body = res
}

exports.update = async ctx => {
    let {id, nickname} = ctx.request.body
    let res = await userModel
        .User
        .findOneAndUpdate({
            id: id
        }, {nickname, email})
    return ctx.body = {
        code: '200',
        message: res
    }
}