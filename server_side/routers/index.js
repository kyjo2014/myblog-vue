'use strict'

const Router = require('koa-router')
const post = require('./post.route')
// const postValidator = require('')

let routers = new Router();

//聚集路由api
routers.use('/posts',post)

module.exports = routers.routes()