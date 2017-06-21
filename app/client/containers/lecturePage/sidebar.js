import { connect } from 'react-redux';
import { addLectureGroups } from '../../actions/index.js';
import Sidebar from '../../components/lecture-page/sidebar/sidebar.js';

const mapStateToProps = (state, ownProps) => {
    let lectureGroups = state.lectureGroups[ownProps.weekId]
    lectureGroups = lectureGroups == undefined ? [] : lectureGroups;

    return {
        lectureGroups
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLectureGroupsReceived: (lectureGroups) => {
            dispatch(addLectureGroups(lectureGroups, ownProps.weekId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
