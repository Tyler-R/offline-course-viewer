var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    lectureFile = require('./lectureFile');

var lecture = sequelize.define('lecture', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    position: {
        type: dataType.INTEGER
    },
    name: {
        type: dataType.TEXT
    },
    type: {
        type: dataType.ENUM('video', 'reading', 'unknown'),
        defaultValue: 'unknown'
    },
    completed: {
        type: dataType.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true, // don't change database name to "lecutres" (plural)
    timestamps: false,
});

lecture.hasMany(lectureFile, { onDelete: 'cascade' });

module.exports = lecture;
