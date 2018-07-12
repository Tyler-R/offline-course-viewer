import { connect } from 'react-redux';
import { addCourseToPlaylist } from '../../actions/index.js';
import Navbar from '../../components/home/navbar/navbar.js';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCourseToPlaylist: (course, playlistId) => {
            dispatch(addCourseToPlaylist(course, playlistId))
        },
    }
}

export default connect(null, mapDispatchToProps)(Navbar)