import { ADD_COURSES, DELETE_COURSE, RENAME_COURSE, ADD_COURSE_TO_PLAYLIST, SWAP_COURSE_POSITION } from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_COURSES:
            return Object.assign({}, state, {
                [action.playlistId]: action.courses
            });
        case DELETE_COURSE:
            return Object.assign({}, state, {
                [action.playlistId]: state[action.playlistId].filter(course => course.id != action.courseId),
            });
        case RENAME_COURSE:
            return Object.assign({}, state, {
                [action.playlistId]: state[action.playlistId].map(
                    course => course.id == action.courseId ? Object.assign({}, course, {name: action.name}) : course
                ),
            });
        case ADD_COURSE_TO_PLAYLIST:
            return Object.assign({}, state, {
                [action.playlistId]: [ ...state[action.playlistId], action.course ]
            });
        case SWAP_COURSE_POSITION:
            return state;
        default: {
            return state;
        }
    }
}
