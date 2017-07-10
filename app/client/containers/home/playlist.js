import { connect } from 'react-redux';
import { selectPlaylist } from '../../actions/index.js';
import Playlist from '../../components/home/playlistSidebar/playlist/playlist.js';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setSelectedPlaylistId: (playlistId) => {
            dispatch(selectPlaylist(playlistId))
        }
    }
}

export default connect(null, mapDispatchToProps)(Playlist)
