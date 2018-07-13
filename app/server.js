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

app.use(require('./controllers'));

app.get('/', (req, res) => {
    if(req.headers['user-agent'] == 'Electron') {
        res.sendFile(path.join(__dirname, 'public', 'electron.index.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'web.index.html'));
    }
});

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

schema.syncAll().then(() => {
    app.listen(port, () => {
        console.log("server listening on port: " + port);
    });
});
