var connection = require('../models').connect

/**
 * 查找所有的文章
 * 
 * @param {any} connection
 * @param {number} [limit=100]
 * @param {number} [offset=0]
 * @returns
 */
function findAll({limit = 100, offset = 0} = {}) {
    let FIND_USER = 'select * from article where Uid>' + offset + ' limit ' + limit
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
 * @param {any} articleID
 * @returns
 */
function findByArticleID(articleID) {
    let articleByID = 'select * from article where id=' + stringWrap(articleID)
    return new Promise((resolve, reject) => {
        connection.query(articleByID, (err, result) => {
            if (err) {
                resolve(err)
            } else {
                resolve(result)
            }
        })
    })
}

exports.findByID = findByArticleID



/**
 * 
 * 
 * @param {any} article
 * @returns
 */
function createArticle(article) {

    var articleTableCol = []
    var articleTableColVal = []
    for (var i in article) {
        articleTableCol.push(i)
        articleTableColVal.push(stringWrap(article[i]))
    }

    insertArticle = 'insert into article(' + articleTableCol.join(",") + ') values(' + articleTableColVal.join(",") + ')'

    return new Promise((resolve, reject) => {
        connection.query(insertArticle, (err) => {
            if (err) {
                resolve(err)
            }
        })
    })
}
exports.createArticle = createArticle


function updateArticle(article) {
    var articleTableCol = []
    var articleTableColVal = []
    for (var i in article) {
        articleTableCol.push(i)
        articleTableColVal.push(stringWrap(article[i]))
    }
    let updateSQL = "update article set " +  +" where " +  ;
}
exports.updateArticle = updateArticle



function deleteArticle(articleID) {
    return new Promise((resolve, reject) => {
        connection.query()
    }).then((result) => {
        console.log(result)
    })
}

exports.deleteArticle = deleteArticle