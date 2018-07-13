var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    lecture = require('./lecture');


var lectureGroup = sequelize.define('lectureGroup', {
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

lectureGroup.hasMany(lecture, { onDelete: 'cascade' });

module.exports = lectureGroup;
