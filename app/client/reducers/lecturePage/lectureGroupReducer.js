import {ADD_LECTURE_GROUPS} from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_LECTURE_GROUPS:
            return Object.assign({}, state, {
                [action.weekId]: action.lectureGroups
            });
        default: {
            return state;
        }
    }
}
