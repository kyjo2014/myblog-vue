let express = require('express')
let userCtr = require('../controllers/user.ctrl')

const router = express.Router()
// console.log(userCtr.list())


module.exports = function (app) {
    router.route('/').get(userCtr.list)
    router.route('/:userName').get(userCtr.get);
    router.route('/').post(userCtrl.create)
    console.log("asdasdas")
    app.use('/api/users', router)
}

