import { combineReducers } from 'redux';

import lectureGroupReducer from './lecturePage/lectureGroupReducer.js'
import lectureReducer from './lecturePage/lectureReducer.js'

const reducers = combineReducers({
    lectureGroups: lectureGroupReducer,
    lectures: lectureReducer
})

export default reducers;
