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

schema.syncAll().then(() => {
    app.listen(port, () => {
        console.log("server listening on port: " + port);
    });
});
