let articleService = require('./article.service')
let articleTagService = require('./article_tag.service')
let tagService = require('./tag.service')
let connection = require('../models').connection
// let commentService = require('./comment.service')
console.log(require('./article.service'))


function findAll() {
    var articles = [];
    var articlesPromise = [];
    return articleService.findAll()
        .then((result) => {
            // console.log(result)
            return result
        })
        .then((result) => {
            result.forEach((article) => {
                articles.push(article)
                articlesPromise.push(articleTagService.findByArticle(article.id))
            })
            Promise.all(articlesPromise)
                .then((value) => {
                    // console.log(value)
                    return value
                }).then((value) => {
                    for (var i = 0; i < value.length; i++) {
                        articles[i].tags = value[i]
                    }
                    console.log(articles)
                    return articles
                })
        })
}

exports.findAll = findAll

// function findByAuthor(authorID) {
//     var articles = [];
//     var articlesPromise = [];

//     return articleService
//         .findByAuthor(authorID)
//         .then((articles) => {

//         })
// }



// function findByTag() {

// }


// function findBySort() {

// }


// function findByID() {

// }

// function findByTitle() {

// }


// function getDetail(postID) {

// }


