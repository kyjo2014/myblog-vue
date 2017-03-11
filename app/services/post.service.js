let articleService = require('./article.service')
let articleTagService = require('./article_tag.service')
let tagService = require('./tag.service')
let connection = require('../models').connection
// let commentService = require('./comment.service')



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
                articlesPromise.push(articleTagService.findByArticle(article.Aid))
            })
            return Promise.all(articlesPromise)
                .then((value) => {
                    // console.log(value)
                    return value
                })
                .then((value) => {
                    for (var i = 0; i < value.length; i++) {
                        articles[i].tags = value[i]       
                    }
                   
                    return articles
                })
        })
}
// findAll().then((result) => {
//     console.log(result)
// })
exports.findAll = findAll


function createPost(article) {
    if (article.hasOwnProperty('tags')) { 
      return articleService.createArticle(article).then((result) => {
            return articleTagService.create(result,article.tags)
        })
    } else {
        return articleService.createArticle(article)
    }
}
// createPost({
//     title: 'createBBB',
//     content: 'create4',
//     Uid: 1,
//     sort: 2,
//     tags:[1,2,4]
// }).then((result) => {
//     console.log(result)
// })
exports.create = createPost

function update(article) { 
    return articleService.updateArticle(article)
}
// update({
//     Aid: 47,
//     title: 'asdasd',
//     content: 'asdfds'
// }).then((result) => {
//     console.log(result)
// })
exports.update = update

function deleteArticle(articleID) {
    return articleService.deleteArticle(articleID)
}
exports.deletePost = deleteArticle


function findByTitle() {

}

/********** TODO LIST *********** */
// function getDetail(postID) {

// }
// function findByTag() {

// }


// function findBySort() {

// }


// function findByID() {

// }

