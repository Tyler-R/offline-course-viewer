var course = require('./schema/course.js'),
    lectureFile = require('./schema/lectureFile.js'),
    lecture = require('./schema/lecture.js'),
    lectureGroup = require('./schema/lectureGroup.js'),
    playlist = require('./schema/playlist.js'),
    week = require('./schema/week.js');

var tables = {playlist, course, week, lectureGroup, lecture, lectureFile};

// export all the schemas
for(var key in tables) {
    module.exports[key] = tables[key];
}

function syncAllTables(keys, keyIndex, onFinish, onFailure) {
    if(keyIndex > (keys.length - 1)) {
        onFinish();
        return;
    }

    var key = keys[keyIndex];

    tables[key].sync({logging: false})
    .then(() => {
        console.log("successfully created database table: " + key);
        syncAllTables(keys, keyIndex + 1, onFinish, onFailure);
    }).catch((err) => {
        console.log("could not create " + key + " database table because: ");
        console.log(err);
        onFailure();
    });


}

module.exports.syncAll = () => {
    return new Promise((success, failure) => {
        syncAllTables(Object.keys(tables), 0, success, failure);
    });
}
