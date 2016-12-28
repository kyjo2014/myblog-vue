// let logger = require('../util/logger')
let articleService = require('../services/article.service')

const operations = {
	list: (req, resp)=>{
		const q = {
			userName: req.params.userName
		}
		return articleService
				.findAll(q)
				.then((data)=>{
					resp.status(200).json(data);
				});
	},
	get: (req, resp)=>{
		const postId = req.params.postId;
		return articleService
				.findById(postId)
				.then((data)=>{
					if(data) {
						resp.status(200).json(data);
					} else {
						resp.status(404).send(errorMessages.POST_NOT_FOUND);
					}
				});
	},
	create: (req, resp)=>{
		const post = req.body;
		post.userId = req.params.userName;
		logger.info('About to create post ', post);
		return articleService
				.create(post)
				.then((data)=>{
					resp.json(data);
				});
	},
	delete: (req, resp)=>{
		const postId = req.params.postId;
		logger.info('About to delete post ', postId);
		return articleService
				.deletePost(postId)
				.then((affectedRows)=>{
					logger.info('rows deleted', affectedRows);
					resp.status(200).end();
				});
	},
	update: (req, resp)=>{
		const postId = req.params.postId;
		const post = req.body;
		post.id = postId;
		return articleService
				.update(post)
				.then((p)=>{
					resp.status(200).end();
				})
				.catch(e=>{
					resp.status(400).end();
				});
	}

}


module.exports = operations;