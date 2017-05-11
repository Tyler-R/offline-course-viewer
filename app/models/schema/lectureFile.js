var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    lecture = require('./lecture.js');


module.exports = sequelize.define('lectureFile', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    path: {
        type: dataType.TEXT
    },
    extension: {
        type: dataType.TEXT
    },
    name: {
        type: dataType.TEXT
    },
    lectureID: {
        type: dataType.UUID,
        references: {
            model: lecture,
            key: 'id'
        }
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
