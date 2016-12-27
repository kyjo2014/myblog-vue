// var mysql = require('mysql');
// var dbconfig = require('./config/dev')
// var dbinit = require('./app/models')

// var connection = mysql.createConnection(dbconfig);

// connection.connect((err) => {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });
// //初始化数据库信息
// // dbinit(connection)


const models = require('./app/models')



// /**
//  * create database if not exist
//  */
// connection.query('CREATE DATABASE myblog', function (err) {
//     if (err) {
//         console.log(err)
//     }

//     // console.log('The solution is: ', rows[0].solution);
// });

// connection.query('USE myblog', (err) => {
//     console.log(err)
// })



