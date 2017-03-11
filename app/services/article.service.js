var connection = require('../models').connection
let stringWrap = require('../util/stringWrap')


/**
 * 查找所有的文章
 * 
 * @param {any} connection
 * @param {number} [limit=100]
 * @param {number} [offset=0]
 * @returns
 */
function findAll({limit = 100, offset = 0} = {}) {
    let FIND_ARTICELE = 'select * from notagarticles where Aid>' + offset + ' limit ' + limit
    return new Promise((resolve, reject) => {
        connection.query(FIND_ARTICELE, (err, result) => {
            // console.log(result)
            if (err) {
                resolve(err)
            } else {
                resolve(result)
            }
        })
    })
}
// findAll().then((result) => {
//     console.log(result)
// })
exports.findAll = findAll

/**
 * 
 * 
 * @param {any} Info
 */
function findByInfo(Info) {
    let findArticle = 'select * from notagarticles where'
}

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
function create(article) {
    let CREATE_ARTICLE = 'call addarticle(' + stringWrap(article.title) +
        ',' + stringWrap(article.content) + ',' +
        article.Uid + ',' + article.sort + ');'
    return new Promise((resolve, reject) => {
        connection.query(CREATE_ARTICLE, (err,result) => {

            if (err) {
                resolve(err)
            } else {
               resolve(result[0][0]['Aid'])
            }
        })
    })
}
// create({
//     title: 'create',
//     content: 'create1',
//     Uid: 1,
//     sort: 2
// }).then((result) => {
//     console.log(result['Aid'])
// })
exports.createArticle = create


function updateArticle(article) {
    var articleTableCol = []
    var articleTableColVal = []
    for (var i in article) {
        articleTableCol.push(i)
        articleTableColVal.push(stringWrap(article[i]))
    }

    let UPDATE_SQL = "update article set title=" + stringWrap(article.title) + ' , content=' +
        stringWrap(article.content) +
        " where id=" + article.Aid;
    return new Promise((resolve, reject) => {
        connection.query(UPDATE_SQL, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve("success")
        })
    })
}
// updateArticle({
//     Aid: 48,
//     title: 'bombshakalala',
//     content: 'fluy'
// }).then((result) => {
//     console.log(result)
// })
exports.updateArticle = updateArticle



function deleteArticle(articleID) {
    let DELETE_ARTICLE = 'delete from article where id='+ articleID
    return new Promise((resolve, reject) => {
        connection.query(DELETE_ARTICLE, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve("success")
        })
    })
}
// deleteArticle(48).then((result) => {
//     console.log(result)
// })
exports.deleteArticle = deleteArticle


// module.exports = {
//     "asd": 123
// }