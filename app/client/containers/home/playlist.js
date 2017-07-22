import { connect } from 'react-redux';
import { selectPlaylist, deletePlaylist, renamePlaylist, swapPlaylistPositions } from '../../actions/index.js';
import Playlist from '../../components/home/playlistSidebar/playlist/playlist.js';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setSelectedPlaylistId: (playlistId) => {
            dispatch(selectPlaylist(playlistId))
        },
        deletePlaylist: (playlistId) => {
            dispatch(deletePlaylist(playlistId))
        },
        setNewName: (playlistId, newName) => {
            dispatch(renamePlaylist(playlistId, newName))
        },
        swapPlaylistPositions: (playlistId, playlistId2) => {
            dispatch(swapPlaylistPositions(playlistId, playlistId2))
        }
    }
}

export default connect(null, mapDispatchToProps)(Playlist)
