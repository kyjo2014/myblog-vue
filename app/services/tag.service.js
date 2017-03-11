let connection = require('../models').connection
let stringWrap = require('../util/stringWrap')


function getName(tagID) {
    let GET_NAME = 'select name from tag where id=' + tagID
    return new Promise((resolve, reject) => {
        connection.query(GET_NAME, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve(result)
        })
    })
}
exports.get = getName


function create(tagName) {
    let CREATE_TAG = 'insert into tag(name) values(' + stringWrap(tagName) + ")"
    return new Promise((resolve, reject) => {
        connection.query(CREATE_TAG, (err, result) => {
            if (err) {
                resolve(err)
            }
        })
    })
}
// create('哈哈')
//  create('bg')
exports.create = create


function list({limit = 50, offset = 0} = {}) {
    let FIND_TAG = 'select * from tag'
    return new Promise((resolve, reject) => {
        connection.query(FIND_TAG, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve(result)
        })
    })
}
//just for test
// list().then((result) => {
//     console.log(result)
// })
exports.list = list


function deleteTag(tagID) {
    let DELETE_TAG = 'delete from tag where id=' + tagID
    return new Promise((resolve, reject) => {
        connection.query(DELETE_TAG, (err, result) => {
            if (err) {
                resolve(err)
            }
        })
    })
}
exports.deleteTag = deleteTag