'use strict'
const router = require('koa-router')
const jwt = require('koa-jwt')
const sortCtrl = require('../controllers/sort.ctrl')
const decodejwt = require('jsonwebtoken')
const hostInfo = require('../conf/mainConf')

let route = new router();

//全部展示
// route.get('/', sortCtrl.list);
//根据搜索框模糊查询
// route.get('/search', sortCtrl.findByQuery);


//新增种类
route.post('/', jwt({
    secret: hostInfo.secretKey
}), sortCtrl.create);


module.exports = route.routes()