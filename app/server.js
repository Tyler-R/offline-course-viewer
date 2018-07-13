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

schema.syncAll().then(() => {
    app.listen(port, () => {
        console.log("server listening on port: " + port);
    });
});
