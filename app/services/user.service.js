var connection = require('../models').connection
var stringWrap = require('../util/stringWrap')

/**
 * 查找所有的用户
 * 
 * @param {any} connection
 * @param {number} [limit=100]
 * @param {number} [offset=0]
 * @returns
 */
function findAll({limit = 100, offset = 0} = {}) {
    let FIND_USER = 'select * from user where Uid>' + offset + ' limit ' + limit
    return new Promise((resolve, reject) => {
        connection.query(FIND_USER, (err, result) => {
            if (err) {
                resolve(err)
            } else {
                resolve(result)
            }
        })
    })
}
exports.findAll = findAll

/**
 * 
 * 
 * @param {any} connection
 * @param {any} userName
 * @returns
 */
function findByUserName(userName) {
    let UserByName = 'select * from user where Uaccount like \'%' + userName + '%\''
    return new Promise((resolve, reject) => {
        connection.query(UserByName, (err, result) => {
            if (err) {
                resolve(err)
            } else {
                resolve(result)
            }
        })
    })
}
exports.findByName = findByUserName

/**
 *增加用戶 
 * 
 * @param {any} connection
 * @param {any} user
 * @returns
 */
function createUser(user) {
    var newUser = {}
    let insertUser = 'insert into user(Uaccount,Uemail) values("1","2")'
    if (user.isHost) {
        var userTableCol = []
        var userTableColVal = []
        for (var i in user) {
            userTableCol.push(i)
            userTableColVal.push(stringWrap(user[i]))
        }

        insertUser = 'insert into user(' + userTableCol.join(",") + ') values(' + userTableColVal.join(",") + ')'
    } else {
        insertUser = 'insert into user(Uaccount,Uemail) values(' + stringWrap(user.Uaccount) + ',' + stringWrap(user.Uemail) + ')'
    }
    return new Promise((resolve, reject) => {
        connection.query(insertUser, (err) => {
            if (err) {
                resolve(err)
            } else {
                resolve("add success")
            }
        })
    })
}
exports.create = createUser

/**
 * 
 * 删除用户
 * @param {any} connection
 * @param {any} userID
 * @returns
 */
function removeUser(userID) {
    let deleteUser = 'delete from user where Uid=' + userID
    console.log(deleteUser)
    return new Promise((resolve, reject) => {
        connection.query(deleteUser, (err) => {
            if (err) {
                resolve(err)
            } else {
                resolve("remove success")
            }
        })
    })
}
exports.delete = removeUser

