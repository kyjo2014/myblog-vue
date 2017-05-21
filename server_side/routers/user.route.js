'use strict'
const router = require('koa-router')
const userCtrl = require('../controllers/user.ctrl')
const hostInfo = require('../conf/mainConf')


let route = new router()


route.all('/', function (ctx) {
    return ctx.body = "test"
})
//登录
route.post('/login', userCtrl.login)

//查看用户信息
route.post('/find/:id',userCtrl.findById)

//删除用户
route.delete('/:id', userCtrl.del)


//注册
route.post('/register',userCtrl.create)

module.exports = route.routes()