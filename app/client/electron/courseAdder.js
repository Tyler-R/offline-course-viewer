import { remote } from 'electron';

import axios from 'axios';


export function addDownloadedCoursesToApp(addCourseToPlaylist) {
    remote.dialog.showOpenDialog({
        title: "Select Downloaded Course Folder",
        properties: ['openDirectory', 'multiSelections'],
    }, (filePaths) => {
        if (filePaths) {
            axios.post('/courses/add/:file-paths', {
                params: {
                    'file-paths': filePaths
                }
            }).then((response) => {
                if(response.data) {
                    let courses = response.data.courses
                    let playlistId = response.data.playlistId
                    courses.forEach(course => {
                        addCourseToPlaylist(course, playlistId);
                    });
                }
            }).catch((err) => {
                let message = ""
                if (err.response) {
                    message = err.response.data
                } else {
                    message = err.message
                }

                M.toast({
                    html: '<b>' + message + '</b>', 
                    classes: 'red rounded',
                    displayLength: 5000,
                });
            });
        }
    });
}
