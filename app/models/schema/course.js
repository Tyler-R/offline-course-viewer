var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    week = require('./week');

var course = sequelize.define('course', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    position: {
        type: dataType.INTEGER
    },
    name: {
        type: dataType.TEXT,
        unique: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

course.hasMany(week, { onDelete: 'cascade' });

module.exports = course;
