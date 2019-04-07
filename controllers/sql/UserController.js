const router = require('express').Router();
var models = require('../../models');

router.post('/register', async (req, res) => {
	try {
		await models.User.create(req.body);
		res.json({
			success: true
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error
		});
	}
});

router.post('/updateUser', async (req, res) => {
	try {
		await models.User.update(req.body, { where: req.body.username });
		res.json({
			success: true
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error
		});
	}
});

router.get('/getUser/:username', async (req, res) => {
	try {
		let user = await models.User.findOne({
			where: { username: req.params.username },
			include: [{ association: 'posts', include: ['comments'] }]
		});
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

router.post('/deleteUser', async (req, res) => {
	try {
		let user = await models.User.destroy({
			where: { username: req.query.username }
		});
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

module.exports = router;