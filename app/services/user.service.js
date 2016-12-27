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
                reject(err)
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
    let UserByName = 'select * from user where Uaccount=' + stringWrap(userName)
    return new Promise((resolve, reject) => {
        connection.query(UserByName, (err, result) => {
            if (err) {
                reject(err)
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
function createUser(user,isHost) {
    let insertUser = 'insert into user(Uacount,Uemail) values()'
    return new Promise((resolve, reject) => {
        connection.query(insertUser, (err) => {
            if (err) {
                reject(err)
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
    let deleteUser = 'delete from user where id=' + userID
    return new Promise((resolve, reject) => {
        connection.query(deleteUser, (err) => {
            if (err) {
                reject(err)
            }
        })
    })
}
exports.delete = removeUser

