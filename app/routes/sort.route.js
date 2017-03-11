let express = require('express')
let sortCtr = require('../controllers/sort.ctrl')

const router = express.Router()
// console.log(sortCtr.list())


module.exports = function (app) {
    router.route('/').get(sortCtr.list)
    router.route('/').post(sortCtr.create)
    router.route('/:sortID').delete(sortCtr.delete)
    app.use('/api/sort', router)
}

