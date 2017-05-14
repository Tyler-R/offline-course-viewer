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
    schema.course.findAll({attributes: ['name']}).then(courses => {
        var response = []
        courses.forEach(course => {
            response.push(course.name);
        });
        res.send(response);
    });
});


app.get('/weeks', (req, res) => {
    let courseName = req.query.courseName;

    schema.course.find({
        attributes: ["id"],
        where: {
            name: courseName
        }
    }).then(course => {
        schema.week.findAll({
            attributes: ["position", "name"],
            where: {
                courseID: course.id
            }
        }).then(weeks => {
            let response = [];
            weeks.forEach(week => {
                response.push({
                    position: week.position,
                    name: week.name
                });
            });

            res.send(response);
        })
    })
});

app.get('/lectureGroups', (req, res) => {
    let courseName = req.query.courseName;
    let weekName = req.query.weekName;

    schema.course.find({
        attributes: ["id"],
        where: {
            name: courseName
        }
    }).then(course => {
        schema.week.find({
            attributes: ["id"],
            where: {
                courseID: course.id,
                name: weekName,
            }
        }).then(week => {
            schema.lectureGroup.findAll({
                attributes: ["position", "name"],
                where: {
                    weekID: week.id,
                }
            }).then(lectureGroups => {
                let response = [];
                lectureGroups.forEach(lectureGroup => {
                    response.push({
                        name: lectureGroup.name,
                        position: lectureGroup.position,
                    });
                });

                res.send(response);
            });
        })
    })
});

app.get('/lectures', (req, res) => {
    let courseName = req.query.courseName;
    let weekName = req.query.weekName;
    let lectureGroupName = req.query.lectureGroupName;
    console.log(courseName + "   " + weekName + "   " + lectureGroupName);

    schema.course.find({
        attributes: ["id"],
        where: {
            name: courseName
        }
    }).then(course => {
        schema.week.find({
            attributes: ["id"],
            where: {
                courseID: course.id,
                name: weekName,
            }
        }).then(week => {
            schema.lectureGroup.find({
                attributes: ["id"],
                where: {
                    weekID: week.id,
                    name: lectureGroupName,
                }
            }).then(lectureGroup => {
                schema.lecture.findAll({
                    attributes: ["position", "name"],
                    where: {
                        lectureGroupID: lectureGroup.id
                    }
                }).then(lectures => {
                    let response = [];
                    lectures.forEach(lecture => {
                        response.push({
                            name: lecture.name,
                            position: lecture.position,
                        });
                    });

                    res.send(response);
                })
            });
        })
    })
});


schema.syncAll().then(() => {
    app.listen(port, () => {
        console.log("server listening on port: " + port);
    });
});
