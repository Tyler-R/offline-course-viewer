import { ADD_LECTURES } from '../../actions/index.js';
import { TOGGLE_COLLAPSED } from '../../actions/index.js';
import { COMPLETE_LECTURE } from '../../actions/index.js';


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
        case COMPLETE_LECTURE:
            let lectureGroupId = undefined;
            let newLectures = undefined;
            Object.keys(state).forEach((id) => {
                let value = state[id];
                for (let i = 0; i < value.lectures.length; i++) {
                    if(value.lectures[i].id == action.lectureId) {
                        lectureGroupId = id;
                        newLectures = JSON.parse(JSON.stringify(value.lectures));
                        newLectures[i].completed = true;
                    }
                }
            });

            if(lectureGroupId == undefined) {
                return state;
            } else {
                return Object.assign({}, state, {
                    [lectureGroupId]: {
                        lectures: newLectures,
                        collapsed: state[lectureGroupId].collapsed
                    }
                });
            }
        default: {
            return state;
        }
    }
}
