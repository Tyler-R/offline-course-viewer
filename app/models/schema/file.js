var sequelize = require('../sequelize.js'),
    dataType = require('sequelize');


module.exports = sequelize.define('file', {
    id: {
        type: dataType.UUID,
        primaryKey: true,
        defaultValue: dataType.UUIDV4
    },
    filePath: {
        type: dataType.TEXT
    },
    fileType: {
        type: dataType.TEXT
    },
    fileName: {
        type: dataType.TEXT
    }
}, {
    freezeTableName: true
});
