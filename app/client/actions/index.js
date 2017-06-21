import axios from 'axios';

export const ADD_LECTURE_GROUPS = "ADD_LECTURE_GROUPS";
export const ADD_LECTURES = "ADD_LECTURES";
export const TOGGLE_COLLAPSED = "TOGGLE_COLLAPSED";

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
