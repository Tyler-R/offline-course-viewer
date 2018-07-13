let express = require('express'),
	router = express.Router();

router.use('/playlists', require('./playlists'));
router.use('/courses', require('./courses'));
router.use('/weeks', require('./weeks'))
router.use('/lectureGroups', require('./lectureGroups'))
router.use('/lectures', require('./lectures'))

module.exports = router