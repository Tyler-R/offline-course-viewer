import ADD_PLAYLISTS from '../../actions/index.js';
import SELECT_PLAYLIST from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_PLAYLISTS:
            return Object.assign({}, state, {
                playlists: action.playlists
            });
        case SELECT_PLAYLIST:
            return Object.assign({}, state, {
                selectedPlaylist: action.playlistId
            });
        default: {
            return state;
        }
    }
}
