'use strict'
const router = require('koa-router')
const userCtrl = require('../controllers/user.ctrl')
const hostInfo = require('../conf/mainConf')
const jwt = require('koa-jwt')

let route = new router()

// route.all('/', function (ctx) {
//     return ctx.body = "test"
// })
//登录
route.post('/login', userCtrl.login)

//检查登录状态
route.get('/checkstatus',userCtrl.checkStatus)

//获取所有用户信息
route.get('/', jwt({secret: hostInfo.secretKey}), userCtrl.list)

//获取管理员信息
route.get('/me', userCtrl.me)
//查看用户信息
route.post('/find/:id', jwt({secret: hostInfo.secretKey}), userCtrl.findById)

//删除用户
route.delete('/:id', jwt({secret: hostInfo.secretKey}), userCtrl.del)

route.put('/:id', jwt({secret: hostInfo.secretKey}), userCtrl.update)

//注册
route.post('/register', userCtrl.create)

module.exports = route.routes()