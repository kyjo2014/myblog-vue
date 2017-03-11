var http = require('http');
var express = require('express');
// var routes = require('../app/routes');
// var user = require('./routes/user');
var path = require('path');
var fs = require('fs')
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');


var commonUtil = require('../app/util/common.util')

var app = express();






// 适用开发和生产环境
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser())
app.use(session({
    resave: true,
    saveUninitialized: true,
    cookie: { domain: 'localhost:3000' },
    secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.all('/api/*', function (req, res, next) {
   console.log(req.cookies)
        next();
});


//注册路由
function bootstrapRoutes() {
    // Skip the app/routes/middlewares directory as it is meant to be
    // used and shared by routes as further middlewares and is not a
    // route by itself
    // const appPath = process.cwd();
    // commonUtil.walk(appPath + '/app', 'route', 'middlewares', function (path) {
    //     logger.info('loading route ', path);
    //     require(path)(app);
    // });
    // console.log(appPath)
    fs.readdirSync('./app/routes')
        .forEach((file) => {
            console.log(file)
            require('../app/routes/' + file)(app)
        })


}

//NOTE: routes config should be defined after all configurations
bootstrapRoutes();



// 错误处理中间件应当在路由加载之后才能加载
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app