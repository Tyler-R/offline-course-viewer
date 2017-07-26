import { connect } from 'react-redux';
import { deleteCourse, addCourseToPlaylist, swapCoursePositions } from '../../actions/index.js';
import Course from '../../components/home/course/course.js';

const mapStateToProps = (state, ownProps) => {
    let playlists = state.playlists.playlists;

    return {
        playlists,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteCourse: () => {
            dispatch(deleteCourse(ownProps.id, ownProps.playlistId))
        },
        addCourseToPlaylist: () => {
            dispatch(addCourseToPlaylist(ownProps.id, ownProps.playlistId))
        },
        swapCoursePositions: (courseId, courseId2) => {
            dispatch(swapCoursePositions(courseId, courseId2, ownProps.playlistId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
