// let logger = require('../util/logger')
let postService = require('../services/post.service')
let tagService = require('../services/tag.service')

const operations = {

	list: (req, res) => {

		return postService
			.findAll()
			.then((data) => {
				res.status(200).json(data);
			});
	},
	getBySort: (req, res) => {
		const postSort = req.params.sort
		return po44stService
			.findBySort(postSort)
			.then((data) => {
				if (data) {
					res.status(200).json(data)
				} else {
					res.status(404).json(errorMessages.POST_NOT_FOUND)
				}
			})
	},
	getByTag: (req, res) => {
		const postTag = req.params.tag

		return
	},
	getAllInfo: (req, res) => {

	},
	getByID: (req, res) => {
		const postId = req.params.postId;
		return postService
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
		// post.userId = req.params.userName;
		// logger.info('About to create post ', post);
		
		if (post.tags) {
			post.tags = JSON.parse(post.tags)
			var tagPromise = []
			post.tags.forEach((tag) => {
				tagPromise.push(tagService.create(tag))
			})
			Promise.all(tagPromise).then((data) => {
				return postService.create(post)
					.then((data) => {
						res.status(200).json(data);
					});
			})
		} else {
			return postService.create(post)
				.then((data) => {
					res.json(data);
				});
		}

	},
	delete: (req, res) => {
		const postId = req.params.postId;
		// logger.info('About to delete post ', postId);
		return postService
			.deletePost(postId)
			.then((affectedRows) => {
				// logger.info('rows deleted', affectedRows);
				res.status(200).json(affectedRows);
			});
	},
	update: (req, res) => {
		const postId = req.params.postId;
		const post = req.body;
		post.Aid = postId;
		return postService
			.update(post)
			.then((p) => {
				res.status(200).json(p);
			})
			.catch(e => {
				res.status(400).end();
			});
	}

}


module.exports = operations;