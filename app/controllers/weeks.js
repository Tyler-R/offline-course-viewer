let express = require('express'),
	router = express.Router(),
	schema = require('../models/schema.js')

router.get('/', (req, res) => {
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

module.exports = router