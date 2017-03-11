let express = require('express')
let userService = require('../services/user.service')
const router = express.Router()
// console.log(tagCtr.list())


module.exports = function (app) {
    router.route('/').post((req, res) => {
        return userService.findByName(req.body.id).then((result) => {
            console.log(result)
            console.log(req.body.pwd)
            if(result.length >0)
                if (result[0].Upassword == req.body.pwd) {
                    req.session.user = 1;
                    res.status(200).cookie("login", 1,{ path: 'http://127.0.0.1:8080',expires: new Date(Date.now() + 900000), httpOnly: true }).json("login success")
                } else {
                    res.status(200).json("login fail")
                    
                }
            else
                res.status(200).json("login fail")
        })
    })
    app.use('/login', router)
}