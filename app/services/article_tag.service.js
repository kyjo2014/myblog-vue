let connection = require('../models').connection



function getByArticle(articleID) {
    let get = 'select tag from article_tag where article=' + articleID
    return new Promise((resolve, reject) => {
        connection.query(get, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve(result)
        })
    })
}

exports.findByArticle = getByArticle


function create(articleID, tagIDs = [1]) {

    var TAG_MODEL = '';
    var CREATE_TAG = 'insert into article_tag(article,tag) ' +
        'select article.id, tag.id from article, tag where article.id = ' + articleID + ' and tag.id in ' +
        '(select tag.id from tag where ' + tagIDs.map((value) => {
            return 'tag.id=' + value
        }).join(' or ') + '); '
    

    return new Promise((resolve, reject) => {
        connection.query(CREATE_TAG, (err, result) => {
            if (err) {
                resolve(err)
            }
            resolve("success")
        })
    })
}
exports.create = create

function remove() {

}

