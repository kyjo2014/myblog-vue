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