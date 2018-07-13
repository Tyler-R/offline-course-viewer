let express = require('express'),
	router = express.Router(),
	schema = require('../models/schema.js'),
	promiseUtil = require('../utils/promiseUtil'),
	diskParser = require('../models/generator/diskParser');

router.get('/', (req, res) => {
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

router.post('/add/:file-paths', (req, res) => {
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

module.exports = router