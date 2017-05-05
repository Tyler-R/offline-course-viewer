var fs = require('fs'),
    path = require('path'),
    schema = require('../schema.js');


function getFoldersInDirectory(folderPath) {
    return new Promise((success, failure) =>{
        fs.readdir(folderPath, (err, files) => {
            if (err) failure(err);
            else {
                success(files.filter((file) => {
                    return fs.statSync(path.join(folderPath, file)).isDirectory();
                })); // only return directories
            }
        });
    });
}

module.exports.addPreviouslyDownloadedCoursesToDatabase = (folderPath) => {
    getFoldersInDirectory(folderPath).then((files) => {
        files.forEach((file) => {
            /*
            addCourseToDatabase(path.join(folderPath, file), file)
            .then(() => {
                console.log("added")
            }).catch((err) => {
                console.log("could not add '" + file + "' to course list as it does not have the correct folder structure.");
            });*/
        });
    }).catch((err) => {
        throw err;
    });
}

function _getCourseInformationFromDisk(courseFolderPath, courseName) {
    return new Promise((success, failure) => {
        _getWeekInformationFromDisk(courseFolderPath, courseName)
        .then((courseToWeekMap) => {
            _getLectureGroupInfomationFromDisk(courseFolderPath, courseToWeekMap[courseName])
            .then(weekToLectureGroupMaps => {
                var promises = [];
                for (var key in weekToLectureGroupMaps) {
                    var weekFolderPath = path.join(courseFolderPath, key);
                    promises.push(_getLectureInformationFromDisk(weekFolderPath, weekToLectureGroupMaps[key]));
                }

                Promise.all(promises).then((lectureGroupToLectureMappings)=> {
                    var lectureGroupToLectureMaps = {};
                    lectureGroupToLectureMappings.forEach(lectureGroupToLectureMapping => {
                        for (var key in lectureGroupToLectureMapping) {
                            lectureGroupToLectureMaps[key] = lectureGroupToLectureMapping[key];
                        }
                    });

                    success(courseToWeekMap, weekToLectureGroupMaps, lectureGroupToLectureMaps);
                });
            });
        });
    });
}

function _getWeekInformationFromDisk(courseFolderPath, courseFolderName) {

    return new Promise((success, failure) => {
        getFoldersInDirectory(courseFolderPath).then(weekFolders => {
            var courseToWeekMap = {};
            weekFolders.forEach(weekFolder => {
                if(courseToWeekMap[courseFolderName]) {
                    courseToWeekMap[courseFolderName].push(weekFolder);
                } else {
                    courseToWeekMap[courseFolderName] = [];
                    courseToWeekMap[courseFolderName].push(weekFolder);
                }
            });
            success(courseToWeekMap);
        }).catch(err => {
            console.log(err);
        });
    });
}

function _getLectureGroupInfomationFromDisk(courseFolderPath, weekFolders) {
    return new Promise((success, failure) => {
        var promises = [];
        weekFolders.forEach(weekFolder => {
            var weekFolderPath = path.join(courseFolderPath, weekFolder);
            promises.push(new Promise((success, failure) => {
                getFoldersInDirectory(weekFolderPath).then(lectureGroupFolders => {
                    var weekToLectureGroupMap = {};
                    lectureGroupFolders.forEach(lectureGroupFolder => {
                        if(weekToLectureGroupMap[weekFolder]) {
                            weekToLectureGroupMap[weekFolder].push(lectureGroupFolder);
                        } else {
                            weekToLectureGroupMap[weekFolder] = [];
                            weekToLectureGroupMap[weekFolder].push(lectureGroupFolder);
                        }
                    });

                    success(weekToLectureGroupMap);
                });
            }));
        });

        Promise.all(promises).then((weekToLectureGroupMaps) => {
            var mapping = {};
            weekToLectureGroupMaps.forEach(weekToLectureGroupMapping => {
                for (var key in weekToLectureGroupMapping) {
                    mapping[key] = weekToLectureGroupMapping[key];
                }
            });

            success(mapping);
        });
    });
}

function _getLectureInformationFromDisk(weekFolderPath, lectureGroupFolders) {
    return new Promise((success, failure) => {
        var promises = [];
        lectureGroupFolders.forEach(lectureGroupFolder => {
            var lectureGroupFolderPath = path.join(weekFolderPath, lectureGroupFolder);
            promises.push(new Promise((success, failure) => {
                fs.readdir(lectureGroupFolderPath, (err, lectureFiles) => {
                    var lectureGroupToLectureMap = {};
                    lectureFiles.forEach((lectureFile) => {
                        if(lectureGroupToLectureMap[lectureGroupFolder]) {
                            lectureGroupToLectureMap[lectureGroupFolder].push(lectureFile);
                        } else {
                            lectureGroupToLectureMap[lectureGroupFolder] = [];
                            lectureGroupToLectureMap[lectureGroupFolder].push(lectureFile);
                        }
                    });

                    success(lectureGroupToLectureMap);
                });
            }));
        });

        Promise.all(promises).then(lectureGroupToLectureMaps => {
            var mapping = {};
            lectureGroupToLectureMaps.forEach(lectureGroupToLectureMapping => {
                for (var key in lectureGroupToLectureMapping) {
                    mapping[key] = lectureGroupToLectureMapping[key];
                }
            });
            console.log(mapping);

            success(mapping);
        });
    });
}

function addCourseDiskInformationToDatabase(courseName, courseToWeekMap, weekToLectureGroupMaps, lectureGroupToLectureMaps) {
    var name = courseName.replace(/-/g, ' ');
    schema.course.build({name}).save()
    .then(savedCourse => {
        courseToWeekMap[courseName].forEach((weekFolderName) => {
            addWeekDiskInformationToDatabase(savedCourse.id, weekFolderName, weekToLectureGroupMaps, lectureGroupToLectureMaps);
        });
    }).catch((err) => {
        console.log("could not insert '" + courseName + "' into the database");
    });
}

function addWeekDiskInformationToDatabase(courseID, weekFolderName, weekToLectureGroupMaps, lectureGroupToLectureMaps) {
    var parsedWeekFolderName = weekFolderName.split('_');
    var position = parsedWeekFolderName[0];
    var name = parsedWeekFolderName[1].replace(/-/g, ' ');

    schema.week.build({position, name, courseID}).save()
    .then(savedWeek => {
        weekToLectureGroupMaps[weekFolderName].forEach(lectureGroupFolderName => {
            addLectureGroupInformationToDatabase(savedWeek.id, lectureGroupFolderName, lectureGroupToLectureMaps);
        });
    }).catch(err => {
        console.log("could not insert '" + weekFolderName + "' into the database");
    });
}

function addLectureGroupInformationToDatabase(weekID, lectureGroupFolderName, lectureGroupToLectureMaps) {
    var parsedLectureGroupFolderName = lectureGroupFolderName.split('_');
    var position = parsedLectureGroupFolderName[0];
    var name = parsedLectureGroupFolderName[1].replace(/-/g, ' ');

    schema.lectureGroup.build(position, name, weekID).save()
    .then(savedLectureGroup => {
        lectureGroupToLectureMaps[lectureGroupFolderName].forEach(lecture => {
            addLectureInformationToDatabase(savedLectureGroup.id, lecture);
        });
    }).catch(err => {
        console.log("could not insert '" + lectureGroupFolderName + "' into the database");
    });
}

function addLectureInformationToDatabase(lectureGroupID, lecture) {

}

var weekToLectureGroupMap = {};
var lectureGroupToFileMap = {};

var courseName = "finance-for-non-finance"
var courseFolderPath = "F:\\Dropbox\\courses\\www-coursera-downloader\\finance-for-non-finance"

_getCourseInformationFromDisk(courseFolderPath, courseName)
.then((courseToWeekMap, weekToLectureGroupMaps, lectureGroupToLectureMaps) => {
    // addCourseDiskInformationToDatabase(courseName, courseToWeekMap, weekToLectureGroupMaps, lectureGroupToLectureMaps);
});


/*.then(() => {

}).catch((err) => {
    console.log("error occured");
});*/


// module.exports.addPreviouslyDownloadedCoursesToDatabase("F:\\Dropbox\\courses\\www-coursera-downloader");
