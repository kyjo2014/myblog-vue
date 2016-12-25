var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111122',
    database: 'myblogtest'
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});


/**
 * create database if not exist
 */
connection.query('CREATE DATABASE myblog', function (err) {
    if (err) {
        console.log(err)
    }

    // console.log('The solution is: ', rows[0].solution);
});

connection.query('USE myblog', (err) => {
    console.log(err)
})



connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});