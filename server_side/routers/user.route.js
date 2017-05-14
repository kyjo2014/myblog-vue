'use strict'
const router = require('koa-router')
const userCtrl = require('../controllers/user.ctrl')


let route = new router()

//登录
route.post('/login', userCtrl.login)

//查看用户信息
route.post('/:id',userCtrl.findById)

//删除用户
route.delete('/:id', userCtrl.del)


//注册
route.post('/register',userCtrl.create)