const koa = require('koa')
const router = require('koa-router')
const mongo = require('./model/mongoModel')
var app = new koa();
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
app.use(route.routes())
app.listen(3000);