var schema = require('./models/schema.js')
    express = require('express'),
    app = express();

port = 3030;

app.get('/', (req, res) => {
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
