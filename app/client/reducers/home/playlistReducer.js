import { ADD_PLAYLISTS, SELECT_PLAYLIST, DELETE_PLAYLIST, RENAME_PLAYLIST } from '../../actions/index.js';

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
            return Object.assign({}, {}, {
                playlists: state.playlists.filter(playlist => playlist.id != action.playlistId),
                selectedPlaylistId: state.selectedPlaylistId,
            });
        case RENAME_PLAYLIST:
            let playlists = state.playlists.map(playlist => {
                if(playlist.id == action.playlistId) {
                    let newPlaylist = {
                        name: action.newName
                    };

                    return Object.assign({}, playlist, newPlaylist);
                } else {
                    return playlist
                }
            });

            return Object.assign({}, state, {
                playlists
            });
        default: {
            return state;
        }
    }
}
