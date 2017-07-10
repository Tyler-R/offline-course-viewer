import ADD_COURSES from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_COURSES:
            return Object.assign({}, state, {
                courses: action.courses
            });
        default: {
            return state;
        }
    }
}
