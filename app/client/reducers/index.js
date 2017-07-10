import { combineReducers } from 'redux';

import lectureGroupReducer from './lecturePage/lectureGroupReducer.js';
import lectureReducer from './lecturePage/lectureReducer.js';
import playlistReducer from './home/playlistReducer.js';
import courseReducer from './home/courseReducer.js';

const reducers = combineReducers({
    lectureGroups: lectureGroupReducer,
    lectures: lectureReducer,
    playlists: playlistReducer,
    courses: courseReducer,
})

export default reducers;
