import { connect } from 'react-redux';
import { deleteCourse, addCourseToPlaylist, swapCoursePositions } from '../../actions/index.js';
import Course from '../../components/home/course/course.js';

const mapStateToProps = (state, ownProps) => {
    let playlists = state.playlists.playlists;
    let playlistId = state.playlists.selectedPlaylistId;

    return {
        playlistId,
        playlists,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteCourse: (playlistId) => {
            dispatch(deleteCourse(ownProps.id, playlistId))
        },
        addCourseToPlaylist: () => {
            dispatch(addCourseToPlaylist(ownProps.course, ownProps.playlistId))
        },
        swapCoursePositions: (courseId, courseId2) => {
            dispatch(swapCoursePositions(courseId, courseId2, ownProps.playlistId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
