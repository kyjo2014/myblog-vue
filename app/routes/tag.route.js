let express = require('express')
let tagCtr = require('../controllers/tag.ctrl')

const router = express.Router()
// console.log(tagCtr.list())


module.exports = function (app) {
    router.route('/').get(tagCtr.list)
        .post(tagCtr.create)
        .delete(tagCtr.delete)
    router.route('/:tagID').get(
        tagCtr.get
    )
    app.use('/api/tags', router)
}

