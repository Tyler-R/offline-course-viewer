let express = require('express'),
	router = express.Router();

router.use('/playlists', require('./playlists'));

module.exports = router