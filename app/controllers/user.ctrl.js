let userService = require('../services/user.service')

const operation = {
    list: (req, res) => {
        return userService
            .findAll(req.query)
            .then((data) => {
                res.status(200).json(data);
            });
    },
    get: (req, res) => {
        const userName = req.params.userName;
        console.log(userName)
        return userService
            .findByName(userName)
            .then((data) => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(404).send(errorMessages.USER_NOT_FOUND);
                }
            });
    },
    create: (req, res) => {
        console.log(req)
        const user = req.body;
        return userService
            .create(user)
            .then((data) => {
                res.json(data);
            });
    },
    delete: (req, res) => {
        const userName = req.params.userID;
        logger.info('About to delete user ', userName);
        return userService
            .delete({
                userName: userName
            })
            .then((affectedRows) => {
                logger.info('rows deleted', affectedRows);
                res.status(200).end();
            });
    }
}



module.exports = operation