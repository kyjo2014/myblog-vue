'use strict'
const router = require('koa-router')
const meInfo = require('../conf/personalInfo')
let route = new router();

//全部展示
route.get('/', ctx => {
    ctx.body = {
        code: 200,
        message: 'success',
        data: meInfo
    }
});


module.exports = route.routes()