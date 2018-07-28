let express = require('express'),
	router = express.Router(),
	sequelize = require('../models/sequelize.js'),
	schema = require('../models/schema.js');

// get all playlists
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

// create playlist
router.post('/:name', (req, res) => {
    let name = req.body.params.name;

    sequelize.transaction({
        isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    }, transaction => {
        return schema.playlist.max('position', {transaction})
        .then(maxPosition => {
            return schema.playlist.create({
                name,
                position: maxPosition + 1,
                isDefault: false,
            },
            {transaction}
            );
        });
    }).then((playlist) => {
        res.send(playlist);
    }).catch(err => {
        res.status(403).send("Could not create playlist");
    });
});

// swap playlist positions
router.put('/swap/:id/:id2', (req, res) => {
    let id = req.body.params.id;
    let id2 = req.body.params.id2;

    sequelize.transaction({
        isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    }, transaction => {
        return schema.playlist.findAll({
            attributes: ["id", "position"],
            where: {
                $or: [{id}, {id: id2}]
            },
            transaction
        }).then(playlists => {
            if(playlists.length < 2) {
                throw new Error();
            }

            let playlistId1 = playlists[0].id
            let playlistPosition1 = playlists[0].position;

            let playlistId2 = playlists[1].id
            let playlistPosition2 = playlists[1].position;

            return schema.playlist.update(
                {position: -1},
                {
                    where: {
                        id: playlistId1
                    },
                    transaction
                },
            ).then((playlist) => {
                return schema.playlist.update(
                    {position: playlistPosition1},
                    {
                        where: {
                            id: playlistId2
                        },
                        transaction
                    },
                ).then((playlist) => {
                    return schema.playlist.update(
                        {position: playlistPosition2},
                        {
                            where: {
                                id: playlistId1
                            },
                            transaction
                        },
                    );
                });
            });
        });
    }).then(() => {
        res.send();
    }).catch(err => {
        console.log(err);
        res.status(400).send("Invalid playlist Ids");
    })


})

// rename playlist
router.put('/:id/:newName', (req, res) => {
    let id = req.body.params.id;
    let newName = req.body.params.newName;

    schema.playlist.update(
        {name: newName},
        {
            where: {
                id
            }
        }
    ).then(() => {
        res.send()
    }).catch(err => {
        res.status(400).send("failed to change playlist name");
    });
});

router.delete('/:id', (req, res) => {
    let id = req.query.id

    sequelize.transaction({
        isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    }, transaction => {
        return schema.playlist.moveCoursesToDefaultPlaylist(id, transaction)
        .then(() => {
            return schema.playlist.delete(id, transaction);
        });
    }).then(() => {
        res.send();
    }).catch(err => {
        res.status(403).send(err.message);
    });
});

module.exports = router