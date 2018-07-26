let express = require('express'),
	router = express.Router(),
	schema = require('../models/schema.js'),
    sequelize = require('sequelize'),
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

router.delete('/:id', (req, res) => {
    let id = req.query.id

    schema.course.destroy({
        where: {
            id
        }
    }).then(coursesDeleted => {
        if(coursesDeleted != 1) {
            // this should never happen.
            console.log("More than one course was deleted based on a primary key.");
        }

        res.send();
    }).catch((err) => {
        res.status(403).send("Failed to delete the course.");
    });
});

router.put('/:id/:name', (req, res) => {
    let id = req.body.params.id;
    let name = req.body.params.name;

    schema.course.update(
        {name},
        {
            where: {
                id
            }
        }
    ).then(course => {
        res.send()
    }).catch(err => {
        if (err instanceof sequelize.UniqueConstraintError) {
            res.status(403).send("Could not rename the course since a course with the name '" + name + "' already exists")
        } else {
            res.status(403).send("Failed to change course name");
        }
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