var sequelize = require('../sequelize.js'),
    dataType = require('sequelize');


module.exports = sequelize.define('course', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    name: {
        type: dataType.TEXT,
        unique: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
