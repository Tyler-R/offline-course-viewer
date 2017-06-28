import axios from 'axios';

export const ADD_LECTURE_GROUPS = "ADD_LECTURE_GROUPS";

export const ADD_LECTURES = "ADD_LECTURES";
export const TOGGLE_COLLAPSED = "TOGGLE_COLLAPSED";
export const COMPLETE_LECTURE = "COMPLETE_LECTURE";

export const SELECT_PLAYLIST = "SELECT_PLAYLIST";

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
