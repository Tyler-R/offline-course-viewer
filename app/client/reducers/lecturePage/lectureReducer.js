import { ADD_LECTURES } from '../../actions/index.js';
import { TOGGLE_COLLAPSED } from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_LECTURES:
            let wasCollapsed = state[action.lectureGroupId] ? state[action.lectureGroupId].collapsed : false;
            return Object.assign({}, state, {
                [action.lectureGroupId] : {
                    lectures: action.lectures,
                    collapsed: wasCollapsed
                }
            });
        case TOGGLE_COLLAPSED:
            let collapsed = state[action.lectureGroupId] ? !state[action.lectureGroupId].collapsed : false;
            let lectures = state[action.lectureGroupId] ? state[action.lectureGroupId].lectures : [];

            return Object.assign({}, state, {
                [action.lectureGroupId]: {
                    lectures,
                    collapsed
                }
            });
        default: {
            return state;
        }
    }
}
