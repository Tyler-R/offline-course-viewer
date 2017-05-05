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

module.exports.syncAll = () => {
    for (var key in tables) {
        tables[key].sync({logging: false})
    }
}
