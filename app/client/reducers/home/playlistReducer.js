import { ADD_PLAYLISTS, SELECT_PLAYLIST, DELETE_PLAYLIST } from '../../actions/index.js';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_PLAYLISTS:
            return Object.assign({}, state, {
                playlists: action.playlists
            });
        case SELECT_PLAYLIST:
            return Object.assign({}, state, {
                selectedPlaylistId: action.playlistId
            });
        case DELETE_PLAYLIST:
            console.log(state.playlists.filter(playlist => playlist.id != action.playlistId))
            return Object.assign({}, {}, {
                playlists: state.playlists.filter(playlist => playlist.id != action.playlistId),
                selectedPlaylistId: state.selectedPlaylistId,
            });
        default: {
            return state;
        }
    }
}
