let sortService = require('../services/sort.service')

const operation = {
    list: (req, res) => {
        return sortService
            .list()
            .then((data) => {
                res.status(200).json(data);
            });
    },
    create: (req, res) => {
        const sort = req.body.name;
        return sortService
            .create(sort)
            .then((data) => {
                res.json(data);
            });
    },
    delete: (req, res) => {
        const sortName = req.params.sortID;
        return sortService
            .deleteSort(sortName)
            .then((affectedRows) => {
                // logger.info('rows deleted', affectedRows);
                res.status(200).json(affectedRows);
            });
    }
}



module.exports = operation