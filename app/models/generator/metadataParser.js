var schema = require('../schema.js');

module.exports.addLectureTypeInformation = function() {
    schema.course.findAll({
        attributes: ['id'],
        include: [schema.week]
    }).then(courses => {
        courses.forEach(course => {
            course.weeks.forEach(week => {
                schema.lectureGroup.findAll({
                    attributes: ['id'],
                    include: [schema.lecture],
                    where: {
                        weekId: week.id
                    }
                }).then(lectureGroups => {
                    lectureGroups.forEach(lectureGroup => {
                        lectureGroup.lectures.forEach(lecture => {
                            schema.lectureFile.findOne({
                                where: {
                                    lectureId: lecture.id,
                                    $or: [
                                        {
                                            extension: {
                                                $eq: 'mp4'
                                            }
                                        },
                                        {
                                            extension: {
                                                $eq: 'html'
                                            }
                                        },
                                        {
                                            extension:{
                                                $eq: 'htm'
                                            }
                                        }
                                    ]
                                }
                            }).then(lectureFile => {
                                let type = lectureFile.extension == 'mp4' ? 'video' : 'reading';
                                schema.lecture.update({
                                    type,
                                }, {
                                    where: {
                                        id: lecture.id
                                    }
                                });
                            });
                        });
                    })
                });
            });
        });
    });
}



this.addLectureTypeInformation();
