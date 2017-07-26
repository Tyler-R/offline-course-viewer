import { ADD_COURSES, DELETE_COURSE, ADD_COURSE_TO_PLAYLIST, SWAP_COURSE_POSITION } from '../../actions/index.js';

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
        case ADD_COURSE_TO_PLAYLIST:
            return state;
        case SWAP_COURSE_POSITION:
            return state;
        default: {
            return state;
        }
    }
}
