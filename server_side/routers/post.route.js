'use strict'
const router = require('koa-router')
const postCtrl = require('../controllers/post.ctrl')


let route = new router();

//全部展示
route.get('/', postCtrl.list);
//根据文章id打开
route.get('/:id', postCtrl.findById);
//新增文章
route.post('/', postCtrl.create);
//删除文章
route.delete('/:id', postCtrl.del);
//更新文章
route.put('/:id', postCtrl.update);

module.exports = route.routes()