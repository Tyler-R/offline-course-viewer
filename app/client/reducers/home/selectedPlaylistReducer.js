import SELECT_PLAYLIST from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case SELECT_PLAYLIST:
            return Object.assign({}, state, {
                selectedPlaylist: action.playlistId
            });
        default: {
            return state;
        }
    }
}
