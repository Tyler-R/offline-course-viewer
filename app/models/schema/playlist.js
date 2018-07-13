var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    course = require('./course');


var playlist = sequelize.define('playlist', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    position: {
        type: dataType.INTEGER,
        unique: true
    },
    name: {
        type: dataType.TEXT,
        unique: true
    },
    isDefault: {
        type: dataType.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

playlist.hasMany(course, { onDelete: 'cascade' });

module.exports = playlist;
