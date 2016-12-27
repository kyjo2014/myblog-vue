/**
 *create user table
 */
const USER_TABLE = {
    name: "user",
    proper: 'Uid int primary key not null auto_increment, \
    Uaccount char(20) not null,\
    Upassword char(30) not null,\
    Uemail  char(30),\
    Uurl text,\
    Udes text,\
    Uexp text,\
    isHost bit not null\
'
}




module.exports = USER_TABLE
