var schema = require('./models/schema.js'),
    express = require('express'),
    path = require('path'),
    app = express();

var port = 3030;

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.get('/courses', (req, res) => {
    schema.course.findAll({attributes: ['name']}).then(courses => {
        var response = []
        courses.forEach(course => {
            response.push(course.name);
        });
        res.send(response);
    });
});

schema.syncAll().then(() => {
    app.listen(port, () => {
        console.log("server listening on port: " + port);
    });
});
