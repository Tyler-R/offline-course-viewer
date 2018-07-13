var sequelize = require('../sequelize.js'),
    dataType = require('sequelize'),
    lecture = require('./lecture');


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
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
