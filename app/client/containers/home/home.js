import { connect } from 'react-redux';
import { addPlaylists, addCourses } from '../../actions/index.js';
import Home from '../../components/home/home.js';

const mapStateToProps = (state, ownProps) => {
    let selectedPlaylist = state.playlists.selectedPlaylist;
    let playlists = state.playlists.playlists;
    let courses = state.courses.courses;

    playlists = playlists == undefined ? [] : playlists;
    courses = courses == undefined ? [] : courses;

    return {
        selectedPlaylist,
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
