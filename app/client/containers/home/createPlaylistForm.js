import { connect } from 'react-redux';
import { addPlaylist } from '../../actions/index.js';
import CreatePlaylistForm from '../../components/home/playlistSidebar/createPlaylistForm/createPlaylistForm.js';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPlaylistCreated: (playlists) => {
            dispatch(addPlaylist(playlists))
        },
    }
}


export default connect(null, mapDispatchToProps)(CreatePlaylistForm)
