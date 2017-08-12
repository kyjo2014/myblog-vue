'use strict'

const Router = require('koa-router')
const post = require('./post.route')
const users = require('./user.route')
const me = require('./me.route')
const sort = require('./sort.route')
// const postValidator = require('')

let routers = new Router();


routers.redirect('/index', '/index.html', 301)

//聚集路由api
routers.use('/posts', post)
routers.use('/users', users)
routers.use('/me', me)
routers.use('/sort',sort)


module.exports = routers.routes()