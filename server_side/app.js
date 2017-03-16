const koa = require('koa')

var app = new koa();

app.use(function *(){
  this.body = 'Hello World';
  console.log(this)
});

app.listen(3000);