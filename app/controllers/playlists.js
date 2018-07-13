let express = require('express'),
	router = express.Router(),
	schema = require('../models/schema.js');

router.get('/', (req, res) => {
    schema.playlist.findAll({
        attributes: ['id', 'position', 'name', 'isDefault']
    }).then(playlists => {
        let response = {
            playlists: [],
            defaultPlaylistId: undefined,
        }
        playlists.forEach(playlist => {
            response.playlists.push({
                id: playlist.id,
                position: playlist.position,
                name: playlist.name,
            });

            if(playlist.isDefault) {
                response.defaultPlaylistId = playlist.id;
            }
        });

        res.send(response);
    });
});

module.exports = router