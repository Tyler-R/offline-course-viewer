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

playlist.moveCoursesToDefaultPlaylist = (id, transaction = null) => {
    return playlist.find({
            attributes: ['id'],
            where: {
                isDefault: true
            },
            transaction
        }).then(defaultPlaylist => {
            if(defaultPlaylist.id == id) {
                throw new Error("Cannot delete default playlist")
            }
            // move all courses to default playlist.
            return course.update(
                {playlistId: defaultPlaylist.id},
                {
                    where: {
                        playlistId: id
                    },
                    transaction
                }
            )
        });
}

playlist.delete = (id, transaction = null) => {
    return playlist.find({
            where: {
                id
            },
            transaction
        }).then(playlist => {
            return playlist.destroy({transaction});
        });
}

module.exports = playlist;
