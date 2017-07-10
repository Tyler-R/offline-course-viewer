import { connect } from 'react-redux';
import { addPlaylists, addCourses } from '../../actions/index.js';
import Home from '../../components/home/home.js';

const mapStateToProps = (state, ownProps) => {
    let selectedPlaylistId = state.playlists.selectedPlaylistId;
    let playlists = state.playlists.playlists;
    let courses = state.courses[selectedPlaylistId];

    playlists = playlists == undefined ? [] : playlists;
    courses = courses == undefined ? [] : courses;

    return {
        selectedPlaylistId,
        playlists,
        courses
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPlaylistsReceived: (playlists) => {
            dispatch(addPlaylists(playlists))
        },
        onCoursesReceived: (courses) => {
            dispatch(addCourses(courses))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
