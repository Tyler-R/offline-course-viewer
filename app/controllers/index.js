let express = require('express'),
	router = express.Router();

router.use('/playlists', require('./playlists'));
router.use('/courses', require('./courses'));
router.use('/weeks', require('./weeks'))

module.exports = router