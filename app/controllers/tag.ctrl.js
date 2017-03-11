let tagService = require('../services/tag.service')

const operation = {
    list: (req, res) => {
        return tagService
            .list()
            .then((data) => {
                res.status(200).json(data);
            });
    },
    create: (req, res) => {
        const tag = req.body.name;
        return tagService
            .create(tag)
            .then((data) => {
                res.json(data);
            });
    },
    delete: (req, res) => {
        const tagName = req.params.tagID;
        return tagService
            .delete(tagName)
            .then((affectedRows) => {
                // logger.info('rows deleted', affectedRows);
                res.status(200).json(affectedRows);
            });
    },
    get: (req, res) => {
        const tagID = req.params.tagID;
        return tagService.get(tagID)
            .then((result) => {
                res.status(200).json(result)
            })
    }
}



module.exports = operation