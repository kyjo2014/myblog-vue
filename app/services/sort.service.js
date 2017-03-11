let connection = require('../models').connection
let stringWrap = require('../util/stringWrap')

function create(sortName) {
    let CREATE_SORT = "insert into sort(name) values(" + stringWrap(sortName) + ")"
    return new Promise((resolve, reject) => {
        connection.query(CREATE_SORT, (err, result) => {
            if (err) {
                resolve(err)
            } else {
                resolve("success")
            }
        })
    })
}

exports.create = create

function list() {
    let LIST_SORT = 'select * from sort;'
    return new Promise((resolve, reject) => {
        connection.query(LIST_SORT, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve(result)
        })
    })
}
// list().then((result) => {
//     console.log(result)
// })
exports.list = list


function deleteSort(sortID) {
    let DELETE_SORT = 'delete from sort where id=' + sortID
    return new Promise((resolve, reject) => {
        connection.query(DELETE_SORT, (err) => {
            if (err) {
                resolve(err)
            } else {
                resolve("success")
            }
        })
    })
}
exports.deleteSort = deleteSort