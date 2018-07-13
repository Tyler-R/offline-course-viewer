var fs = require('fs'),
    path = require('path'),
    sequelize = require('sequelize'),
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

function mapLectureInformationToLectureFiles(lectureFiles) {
    var lectureMapping = {};
    lectureFiles.forEach(lectureFile => {
        var pattern = new RegExp('([0-9]+)_([^_.]+)');
        var result = pattern.exec(lectureFile.name);

        var lectureName = result[0];

        if(lectureMapping[lectureName]) {
            lectureMapping[lectureName].push(lectureFile);
        } else {
            lectureMapping[lectureName] = [];
            lectureMapping[lectureName].push(lectureFile);
        }
    });

    return lectureMapping;
}

module.exports.addPreviouslyDownloadedCourseToDatabase = (folderPath) => {
    return new Promise((success, failure) => {
        schema.playlist.findOrCreate({
            where: {
                isDefault: true
            }, defaults: {
                name: "Default",
                position: 0,
                isDefault: true,
            }
        }).spread((savedPlaylist, wasCreated) => {
            var playlistId = savedPlaylist.id;
            
            schema.course.max('position', {
                where: {
                    playlistId
                }
            }).then(maxPosition => {
                if(!maxPosition) {
                    maxPosition = 0;
                }

                var courseName = path.parse(folderPath).base;
                console.log("attempting to add '" + courseName + "' to database from the path: " + folderPath);

                getCourseInformationFromDisk(folderPath, courseName)
                .then((courseMap) => {
                    addCourseDiskInformationToDatabase(courseName, playlistId, maxPosition + 1, courseMap)
                    .then((course) => {
                        success(course);
                    }).catch((err) => {
                        failure(err)
                    });
                }).catch((err) => {
                    console.log("could not add '" + folder + "' to course list as it does not have the correct folder structure.");
                    console.log(err);
                    failure("Error: could not add '" + folder + "' to course list as it does not have the correct folder structure.")
                });
            });
        });
    });
}

function getCourseInformationFromDisk(courseFolderPath, courseName) {
    return new Promise((success, failure) => {
        getWeekInformationFromDisk(courseFolderPath, courseName)
        .then((courseToWeekMap) => {
            getLectureGroupInfomationFromDisk(courseFolderPath, courseToWeekMap[courseName])
            .then(weekToLectureGroupMaps => {
                var promises = [];
                for (var key in weekToLectureGroupMaps) {
                    var weekFolderPath = path.join(courseFolderPath, key);
                    promises.push(getLectureInformationFromDisk(weekFolderPath, weekToLectureGroupMaps[key], key));
                }

                Promise.all(promises).then(weekTolectureGroupToLectureFileMappings => {
                    // var weekTolectureGroupToLectureFileMap = {};
                    var courseMapping = {};
                    courseMapping[courseName] = {};
                    weekTolectureGroupToLectureFileMappings.forEach(weekTolectureGroupToLectureFileMapping => {
                        for (var week in weekTolectureGroupToLectureFileMapping) {
                            courseMapping[courseName][week] = weekTolectureGroupToLectureFileMapping[week];
                        }
                    });

                    success(courseMapping);
                });
            });
        });
    });
}

function getWeekInformationFromDisk(courseFolderPath, courseFolderName) {

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

function getLectureGroupInfomationFromDisk(courseFolderPath, weekFolders) {
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

function getLectureInformationFromDisk(weekFolderPath, lectureGroupFolders, weekFolder) {
    return new Promise((success, failure) => {
        var promises = [];

        lectureGroupFolders.forEach(lectureGroupFolder => {
            var lectureGroupFolderPath = path.join(weekFolderPath, lectureGroupFolder);
            promises.push(new Promise((success, failure) => {
                fs.readdir(lectureGroupFolderPath, (err, lectureFiles) => {
                    var lectureGroupToLectureMap = {};
                    lectureFiles.forEach(lectureFile => {
                        if(lectureGroupToLectureMap[lectureGroupFolder]) {
                            lectureGroupToLectureMap[lectureGroupFolder].push({name: lectureFile, path: path.join(lectureGroupFolderPath, lectureFile)});
                        } else {
                            lectureGroupToLectureMap[lectureGroupFolder] = [];
                            lectureGroupToLectureMap[lectureGroupFolder].push({name: lectureFile, path: path.join(lectureGroupFolderPath, lectureFile)});
                        }
                    });

                    success(lectureGroupToLectureMap);
                });
            }));
        });

        Promise.all(promises).then(lectureGroupToLectureMaps => {
            var mapping = {};
            mapping[weekFolder] = {};
            lectureGroupToLectureMaps.forEach(lectureGroupToLectureMapping => {
                for (var key in lectureGroupToLectureMapping) {
                    mapping[weekFolder][key] = lectureGroupToLectureMapping[key];
                }
            });


            for (var lectureGroup in mapping[weekFolder]) {
                mapping[weekFolder][lectureGroup] = mapLectureInformationToLectureFiles(mapping[weekFolder][lectureGroup])
            }

            success(mapping);
        });
    });
}




function addCourseDiskInformationToDatabase(courseName, playlistId, position, courseMap) {
    return new Promise((success, failure) => {
        let name = courseName.replace(/-/g, ' ');

        schema.course.build({
            name,
            position,
            playlistId
        }).save()
        .then(savedCourse => {
            let promises = []

            for (var weekFolderName in courseMap[courseName]) {
                promises.push(addWeekDiskInformationToDatabase(savedCourse.id, weekFolderName, courseMap[courseName]));
            }

            Promise.all(promises)
            .then(() => {
                let id = savedCourse.id
                let course = { id, name }

                success({ course, playlistId });
            }).catch((err) => {
                failure(err);
            });
        }).catch(err => {
            if (err instanceof sequelize.UniqueConstraintError) {
                console.log("Could not add course with name '" + name + "' because a course with that name is already in the database.");
                failure("A course with the same name already exists. Either delete the old course or change the name of your new course.");
            } else {
                console.log("could not insert '" + name + "' into the course database because: ");
                console.log(err);
                failure("Error: could not insert '" + name + "' into the course database. Try again.");
            }
        });
    });
}

function addWeekDiskInformationToDatabase(courseId, weekFolderName, weekMap) {
    var parsedWeekFolderName = weekFolderName.split('_');
    var position = parsedWeekFolderName[0];
    var name = parsedWeekFolderName[1].replace(/-/g, ' ');

    schema.week.build({position, name, courseId}).save()
    .then(savedWeek => {
        for (var lectureGroupFolderName in weekMap[weekFolderName]) {
            addLectureGroupInformationToDatabase(savedWeek.id, lectureGroupFolderName, weekMap[weekFolderName]);
        }
    }).catch(err => {
        console.log("could not insert '" + weekFolderName + "' into the week database because: ");
        console.log(err);
    });
}

function addLectureGroupInformationToDatabase(weekId, lectureGroupFolderName, lectureGroupMap) {
    var parsedLectureGroupFolderName = lectureGroupFolderName.split('_');
    var position = parsedLectureGroupFolderName[0];
    var name = parsedLectureGroupFolderName[1].replace(/-/g, ' ');

    schema.lectureGroup.build({position, name, weekId}).save()
    .then(savedLectureGroup => {
        for (var lecture in lectureGroupMap[lectureGroupFolderName]) {
            addLectureInformationToDatabase(savedLectureGroup.id, lecture, lectureGroupMap[lectureGroupFolderName]);
        }
    }).catch(err => {
        console.log("could not insert '" + lectureGroupFolderName + "' into the lectureGroup database because: ");
        console.log(err);
    });
}

function addLectureInformationToDatabase(lectureGroupId, lectureName, lectureMap) {
    var parsedLectureName = lectureName.split('_');
    var position = parsedLectureName[0];
    var name = parsedLectureName[1].replace(/-/g, ' ');

    // find if the lecture is a video or reading lecture
    var type = 'unknown';
    lectureMap[lectureName].forEach(lectureFile => {
        var parsedLectureFileName = lectureFile.name.split('.');
        var extension = parsedLectureFileName[parsedLectureFileName.length - 1];

        if(extension == 'mp4') {
            type = 'video';
        } else if(extension == "html" || extension == "htm") {
            type = 'reading';
        }
    });

    schema.lecture.build({position, name, type, lectureGroupId}).save()
    .then(savedLecture => {
        lectureMap[lectureName].forEach(lectureFile => {
            addLectureFileInformationToDatabase(savedLecture.id, lectureFile);
        });
    }).catch(err => {
        console.log("could not insert '" + lectureName + "' into the lecture database because: ");
        console.log(err);
    });
}

function addLectureFileInformationToDatabase(lectureId, lectureFile) {
    var parsedLectureFileName = lectureFile.name.split('.');
    var extension = parsedLectureFileName[parsedLectureFileName.length - 1];
    var path = lectureFile.path;
    var name = lectureFile.name;

    // some of the observed extensions include:
    // ['pdf', 'xlsx', 'txt', 'mp4', 'srt', 'html', 'zip', 'md', 'git', 'cfm', 'asp', 'edu', 'php']

    schema.lectureFile.build({path, extension, name, lectureId}).save()
    .then(savedLecture => {
        // done adding data to database
    }).catch(err => {
        console.log("could not insert '" + lectureGroupFolderName + "' into the lectureFile database because: ");
        console.log(err);
    });
}
