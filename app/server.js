var schema = require('./models/schema.js'),
    bodyParser = require('body-parser'),
    path = require('path'),
    express = require('express'),
    app = express();

var port = 3030;

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/courses', (req, res) => {
    schema.course.findAll({attributes: ['id', 'name']}).then(courses => {
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
