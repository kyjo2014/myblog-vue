'use strict'
const router = require('koa-router')
const postCtrl = require('../controllers/post.ctrl')
const jwt = require('koa-jwt')
const decodejwt = require('jsonwebtoken')
const hostInfo = require('../conf/mainConf')

let route = new router();

//全部展示
route.get('/', postCtrl.list);
//根据搜索框模糊查询
route.get('/search', postCtrl.findByQuery);
//根据文章id打开
route.get('/:id', postCtrl.findById);

//新增文章
route.post('/', jwt({
    secret: hostInfo.secretKey
}), postCtrl.create);
//删除文章
route.delete('/:id', jwt({
    secret: hostInfo.secretKey
}), postCtrl.del);
//更新文章
route.put('/:id', jwt({
    secret: hostInfo.secretKey
}), postCtrl.update);

module.exports = route.routes()