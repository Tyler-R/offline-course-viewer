var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    course = require('./course.js');


module.exports = sequelize.define('playlist', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    position: {
        type: dataType.TEXT
    },
    name: {
        type: dataType.TEXT
    },
    courseID: {
        type: dataType.UUID,
        references: {
            model: course,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});
