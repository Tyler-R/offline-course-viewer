var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    week = require('./week.js');


module.exports = sequelize.define('course', {
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
    },
    weekID: {
        type: dataType.UUID,
        references: {
            model: week,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
