var schema = require('./models/schema.js'),
    sequelize = require('./models/sequelize.js'),
    promiseUtil = require('./utils/promiseUtil.js'),
    bodyParser = require('body-parser'),
    path = require('path'),
    express = require('express'),
    app = express(),
    diskParser = require('./models/generator/diskParser.js');

var port = 3030;

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    if(req.headers['user-agent'] == 'Electron') {
        res.sendFile(path.join(__dirname, 'public', 'electron.index.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'web.index.html'));
    }
});

app.get('/playlists', (req, res) => {
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
    })
})

app.get('/courses', (req, res) => {
    let playlistId = req.query.playlistId

    schema.course.findAll({
        attributes: ['id', 'position', 'name'],
        where: {
            playlistId
        }
    }).then(courses => {
        var response = []
        courses.forEach(course => {
            response.push({
                id: course.id,
                name: course.name
            });
        });
        res.send(response);
    });
});


app.get('/weeks', (req, res) => {
    let courseId = req.query.courseId;

    schema.week.findAll({
        attributes: ["id", "position", "name"],
        where: {
            courseId
        },
        order: "position"
    }).then(weeks => {
        let response = [];
        weeks.forEach(week => {
            response.push({
                id: week.id,
                position: week.position,
                name: week.name
            });
        });

        res.send(response);
    })
});

app.get('/lectureGroups', (req, res) => {
    let weekId = req.query.weekId;

    schema.lectureGroup.findAll({
        attributes: ["id", "position", "name"],
        where: {
            weekId
        },
        order: "position"
    }).then(lectureGroups => {
        let response = [];
        lectureGroups.forEach(lectureGroup => {
            response.push({
                id: lectureGroup.id,
                name: lectureGroup.name,
                position: lectureGroup.position,
            });
        });

        res.send(response);
    });
});

app.get('/lectures', (req, res) => {
    let lectureGroupId = req.query.lectureGroupId;


    schema.lecture.findAll({
        attributes: ["id", "position", "name", "type", "completed"],
        where: {
            lectureGroupId
        },
        order: "position"
    }).then(lectures => {
        let response = [];
        lectures.forEach(lecture => {
            response.push({
                id: lecture.id,
                name: lecture.name,
                position: lecture.position,
                type: lecture.type,
                completed: lecture.completed,
            });
        });

        res.send(response);
    });
});

app.post('/courses/add/:file-paths', (req, res) => {
    let filePaths = req.body.params['file-paths'];
    console.log("recived request to add course for: " + filePaths);

    if(!filePaths) {
        res.status(500).send("Invalid file path");
    }

    promiseUtil.forEach(filePaths, (filePath) => {
        return diskParser.addPreviouslyDownloadedCourseToDatabase(filePath)
    }).then((data) => {
        if (data.length >= 1) {
            let courses = []
            let playlistId = data[0].playlistId
            data.forEach(val => {
                courses.push(val.course)
            });

            let response = { courses, playlistId}
            res.send(response);
        } else {
            console.log("Error: Course could not be added to the database.")
            res.status(500).send("Error: Course could not be added to the database.")
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.get('/stream', (req, res) => {
    let lectureId = req.query.lectureId;

    schema.lectureFile.find({
        attributes: ['path'],
        where: {
            lectureId,
            extension: 'mp4'
        }
    }).then(lectureFile => {
        res.sendFile(lectureFile.path, err => {
            if(err) {
                console.log(err);
            }
        });
    });
});

app.put('/lecture/complete/:lectureId', (req, res) => {
    let lectureId = req.body.params.lectureId;

    schema.lecture.update(
        {completed: true},
        {
            where: {
                id: lectureId
            }
        }
    ).catch(err => {
        console.log("ERROR in /lecture/complete/:lectureId: " + JSON.stringify(err));
    });
});

app.post('/playlist/:name', (req, res) => {
    let name = req.body.params.name;

    schema.playlist.max('position')
    .then((maxPosition) => {
        schema.playlist.create({
            name,
            position: maxPosition + 1,
            isDefault: false,
        }).then((playlist) => {
            res.send(playlist);
        });
    });
});

app.put('/playlist/swap/:id/:id2', (req, res) => {
    let id = req.body.params.id;
    let id2 = req.body.params.id2;

    sequelize.transaction(transaction => {
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
                    }
                },
                {transaction}
            ).then((playlist) => {
                return schema.playlist.update(
                    {position: playlistPosition1},
                    {
                        where: {
                            id: playlistId2
                        }
                    },
                    {transaction}
                ).then((playlist) => {
                    return schema.playlist.update(
                        {position: playlistPosition2},
                        {
                            where: {
                                id: playlistId1
                            }
                        },
                        {transaction}
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
app.put('/playlist/:id/:newName', (req, res) => {
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

app.delete('/playlist/:id', (req, res) => {
    let id = req.query.id

    schema.playlist.find({
        attributes: ['id'],
        where: {
            isDefault: true
        }
    }).then(defaultPlaylist => {
        if(defaultPlaylist.id == id) {
            res.status(403).send("Cannot delete default playlist");
            return;
        }

        schema.course.update(
            {playlistId: defaultPlaylist.id},
            {
                where: {
                    playlistId: id
                }
            }
        ).then(() => {
            schema.playlist.find({
                where: {
                    id
                }
            }).then(playlist => {
                return playlist.destroy();
            }).then(() => {
                res.status(200).send();
            });
        });
    });
});


schema.syncAll().then(() => {
    app.listen(port, () => {
        console.log("server listening on port: " + port);
    });
});
