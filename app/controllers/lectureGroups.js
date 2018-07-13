let express = require('express'),
    router = express.Router(),
    schema = require('../models/schema.js')


router.get('/', (req, res) => {
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

module.exports = router