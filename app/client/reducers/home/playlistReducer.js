import { ADD_PLAYLISTS, SELECT_PLAYLIST, DELETE_PLAYLIST, RENAME_PLAYLIST, ADD_PLAYLIST, SWAP_PLAYLIST_POSITIONS } from '../../actions/index.js';

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
        case ADD_PLAYLIST:
            return Object.assign({}, state, {
                playlists: [...state.playlists, action.playlist]
            });
        case SWAP_PLAYLIST_POSITIONS:
            let playlistPosition = state.playlists.findIndex(playlist => action.playlistId == playlist.id)
            let playlist2Position = state.playlists.findIndex(playlist => action.playlistId2 == playlist.id)
            let newPlaylists = [...state.playlists]

            let temp = newPlaylists[playlistPosition];
            newPlaylists[playlistPosition] = newPlaylists[playlist2Position];
            newPlaylists[playlist2Position] = temp;

            let tempPosition = newPlaylists[playlistPosition].position
            newPlaylists[playlistPosition].position = newPlaylists[playlist2Position].position;
            newPlaylists[playlist2Position].position = tempPosition;

            return Object.assign({}, state, {
                playlists: newPlaylists
            })
        default: {
            return state;
        }
    }
}
