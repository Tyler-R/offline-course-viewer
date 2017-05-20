var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    lectureGroup = require('./lectureGroup.js');


var week = sequelize.define('week', {
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
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

week.hasMany(lectureGroup);

module.exports = week;
