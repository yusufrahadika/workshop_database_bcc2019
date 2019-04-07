const router = require('express').Router();
var models = require('../../models');

router.post('/createPost', async (req, res) => {
	try {
		await models.Post.create(req.body);
		res.json({ success: true });
	} catch (error) {
		res.status(400).json({
			success: false,
			error
		});
	}
});

router.get('/getPostByUser', async (req, res) => {
	try {
		let user = await models.Post.findOne({ where: { creator: req.query.username } });
		if (user) {
			res.json({ success: true, user });
		} else {
			res.status(404).json({ success: false });
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			error
		});
	}
});

router.post('/postComment', async (req, res) => {
	try {
		await models.Comment.create(req.body);
		res.json({ success: true });
	} catch (error) {
		res.status(400).json({
			success: false,
			error
		});
	}
});

module.exports = router;