let express = require('express'),
	router = express.Router(),
	schema = require('../models/schema.js')

router.get('/', (req, res) => {
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

router.put('/complete/:lectureId', (req, res) => {
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

module.exports = router