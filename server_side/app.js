//安装插件
const koa = require('koa')
const router = require('koa-router')
const favicon = require('koa-favicon');
const compress = require('koa-compress')
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const serve = require('koa-static');
// const mount =require('koa-mount')
const jwt = require('koa-jwt');
const bodyPraser = require('koa-bodyparser');
const cors = require('kcors');

//引用配置文件
const conf = require('./conf/mainConf')

//引入mongoose实例
const mongo = require('./model/mongoModel')

//生成koa实例
var app = new koa();

//设置常量
app.port = process.env.PORT || 3000;
console.log(process.argv)


app.use(cors())
app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// app.use(favicon(__dirname + '/public/favicon.ico')); etag works together with
// conditional-get
app.use(conditional());
app.use(etag());
// or use absolute paths
app.use(serve(__dirname + '/www'));
//加上body-praser
app.use(bodyPraser())

//未登录错误拦截
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
});

//加载路由
const routers = require('./routers/index')
app.use(routers)

app.listen(app.port);