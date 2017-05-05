var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    lectureGroup = require('./lectureGroup.js')
    file = require('./lectureFile.js');

module.exports = sequelize.define('lecture', {
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
    lectureGroupID: {
        type: dataType.UUID,
        references: {
            model: lectureGroup,
            key: 'id'
        }
    }

}, {
    freezeTableName: true, // don't change database name to "lecutres" (plural)
    timestamps: false,
});
