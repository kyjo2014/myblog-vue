'use strict'
const router = require('koa-router')
const postCtrl = require('../controllers/post.ctrl')
const jwt = require('koa-jwt')
const decodejwt = require('jsonwebtoken')
const hostInfo = require('../conf/mainConf')

let route = new router();

//全部展示
route.get('/', tagCtrl.list);
//根据搜索框模糊查询
route.get('/search', tagCtrl.findByQuery);


//新增标签
route.post('/', jwt({
    secret: hostInfo.secretKey
}), tagCtrl.create);


module.exports = route.routes()