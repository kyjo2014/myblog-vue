/**
 *create user table
 */
module.exports = function (connection) {
    connection.query(createUserTable, (err, result) => {
        console.log(err)
        console.log(result)
    })
}
const createUserTable = '\
    create table user ( \
	Uid int primary key not null auto_increment, \
    Uaccount char(20) not null,\
    Upassword char(30) not null,\
    Uemail  char(30),\
    Uurl text,\
    Udes text,\
    Uexp text,\
    isHost bit not null\
);'
