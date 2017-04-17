'use strict'
const router = require('koa-router')
const postCtrl = require('../controllers/post.ctrl')


let route = new router();

route.get('/', postCtrl.list);
route.post('/', postCtrl.create);

module.exports = route.routes()
// route.post('/', postCtrl.create);