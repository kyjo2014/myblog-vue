const log4js = require('log4js')
log4js.configure({
    appenders: [{
            type: 'console'
        }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal'
        }
    ]
});

let logger = log4js.getLogger()
logger.debug("some thing wrong")