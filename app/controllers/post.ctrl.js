// let logger = require('../util/logger')
let articleService = require('../services/article.service')

const operations = {

	list: (req, res) => {
		const q = {
			userName: req.params.userName
		}
		return articleService
			.findAll(q)
			.then((data) => {
				res.status(200).json(data);
			});
	},
	getBySort: (req, res) => {
		const postSort = req.params.sort
		return articleService
			.findBySort(postSort)
			.then((data) => {
				if (data) {
					res.status(200).json(data)
				} else {
					res.status(404).json(errorMessages.POST_NOT_FOUND)
				}
			})
	},
	get: (req, res) => {
		const postId = req.params.postId;
		return articleService
			.findById(postId)
			.then((data) => {
				if (data) {
					res.status(200).json(data);
				} else {
					res.status(404).send(errorMessages.POST_NOT_FOUND);
				}
			});
	},
	create: (req, res) => {
		const post = req.body;
		post.userId = req.params.userName;
		logger.info('About to create post ', post);
		return articleService
			.create(post)
			.then((data) => {
				res.json(data);
			});
	},
	delete: (req, res) => {
		const postId = req.params.postId;
		logger.info('About to delete post ', postId);
		return articleService
			.deletePost(postId)
			.then((affectedRows) => {
				logger.info('rows deleted', affectedRows);
				res.status(200).end();
			});
	},
	update: (req, res) => {
		const postId = req.params.postId;
		const post = req.body;
		post.id = postId;
		return articleService
			.update(post)
			.then((p) => {
				res.status(200).end();
			})
			.catch(e => {
				res.status(400).end();
			});
	}

}


module.exports = operations;