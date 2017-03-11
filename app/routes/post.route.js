let express = require('express')
let postCtr = require('../controllers/post.ctrl')

// const router = express.Router()
// console.log(userCtr.list())


module.exports = function (app) {

    let router = express.Router();
    router.route('/:userName/posts')
        .get((req, res) => {
            console.log(req)
        })
    router.route('/')
        .get(postCtr.list)
    app.use('/api/users', router);



    router = express.Router();
    router.route('/:postId').get((req, res) => {
        console.log(req)
    }).put(postCtr.update)
      .delete(postCtr.delete);
    app.use('/api/posts', router);

    router = express.Router();
    router.route('/')
        .get(postCtr.list)
        .post(postCtr.create);
    app.use('/api/posts', router);
}

