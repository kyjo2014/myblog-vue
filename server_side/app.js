//安装插件
const koa = require('koa')
const router = require('koa-router')
const favicon = require('koa-favicon');
const compress = require('koa-compress')
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const serve = require('koa-static');

//引入mongoose实例
const mongo = require('./model/mongoModel')

//生成koa实例
var app = new koa();

app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(favicon(__dirname + '/public/favicon.ico'));

// etag works together with conditional-get
app.use(conditional());
app.use(etag());


// or use absolute paths
app.use(serve(__dirname + '/dist'));


const route = new router()

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

route.get('/', async function (ctx) {
  await timeout(200)
  ctx.body = "Hello world 3";
})
route
app.use(route.routes())
app.listen(3000);