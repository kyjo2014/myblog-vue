let express = require('express')
let postCtr = require('../controllers/post.ctrl')

const router = express.Router()
// console.log(userCtr.list())


module.exports = function (app) {
    router.route('/:userName/posts')
        .get((req, res) => {
            console.log(req)
        })
		// .post([postValidator.reqValidator, postCtrl.create]);
	app.use('/api/users', router);

	// router = express.Router();
    // router.route('/:postId').get((req, res) => {
    //     console.log(req)
    // })
		// .get([postValidator.uuidValidator, postCtrl.get])
		// .put([postValidator.uuidValidator, postCtrl.update])
		// .delete([postValidator.uuidValidator, postCtrl.delete]);
	app.use('/api/posts', router);
}

