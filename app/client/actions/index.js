import axios from 'axios';

export const ADD_LECTURE_GROUPS = "ADD_LECTURE_GROUPS";

export const ADD_LECTURES = "ADD_LECTURES";
export const TOGGLE_COLLAPSED = "TOGGLE_COLLAPSED";
export const COMPLETE_LECTURE = "COMPLETE_LECTURE";

export const SELECT_PLAYLIST = "SELECT_PLAYLIST";
export const ADD_PLAYLISTS = "ADD_PLAYLISTS";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const RENAME_PLAYLIST = "RENAME_PLAYLIST";
export const ADD_PLAYLIST = "ADD_PLAYLIST";
export const SWAP_PLAYLIST_POSITIONS = "SWAP_PLAYLIST_POSITIONS";

export const ADD_COURSES = "ADD_COURSES";
export const DELETE_COURSE = "DELETE_COURSE"
export const ADD_COURSE_TO_PLAYLIST = "ADD_COURSE_TO_PLAYLIST"
export const SWAP_COURSE_POSITION = "SWAP_COURSE_POSITION"


export function addLectureGroups(lectureGroups, weekId) {
    return {
        type: ADD_LECTURE_GROUPS,
        weekId,
        lectureGroups,
    };
}


export function addLectures(lectures, lectureGroupId) {
    return {
        type: ADD_LECTURES,
        lectureGroupId,
        lectures,
    }
}

export function toggleCollapsed(collapsed, lectureGroupId) {
    return {
        type: TOGGLE_COLLAPSED,
        collapsed,
        lectureGroupId,
    }
}

export function completeLecture(lectureId) {
    return {
        type: COMPLETE_LECTURE,
        lectureId,
    }
}


export function selectPlaylist(playlistId) {
    return {
        type: SELECT_PLAYLIST,
        playlistId,
    }
}

export function addPlaylists(playlists) {
    return {
        type: ADD_PLAYLISTS,
        playlists,
    }
}

export function deletePlaylist(playlistId) {
    return {
        type: DELETE_PLAYLIST,
        playlistId
    }
}

export function renamePlaylist(playlistId, newName) {
    return {
        type: RENAME_PLAYLIST,
        playlistId,
        newName,
    }
}

export function addPlaylist(playlist) {
    return {
        type: ADD_PLAYLIST,
        playlist,
    }
}

export function swapPlaylistPositions(playlistId, playlistId2) {
    return {
        type: SWAP_PLAYLIST_POSITIONS,
        playlistId,
        playlistId2,
    }
}


export function addCourses(courses, playlistId) {
    return {
        type: ADD_COURSES,
        playlistId,
        courses,
    }
}

export function deleteCourse(courseId, playlistId) {
    return {
        type: DELETE_COURSE,
        courseId,
        playlistId,
    }
}

export function addCourseToPlaylist(course, playlistId) {
    return {
        type: ADD_COURSE_TO_PLAYLIST,
        course,
        playlistId,
    }
}

export function swapCoursePositions(courseId, courseId2, playlistId) {
    return {
        type: SWAP_COURSE_POSITION,
        courseId,
        courseId2,
        playlistId,
    }
}
