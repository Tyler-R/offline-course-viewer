let express = require('express'),
	router = express.Router();

router.use('/playlists', require('./playlists'));
router.use('/courses', require('./courses'));

module.exports = router