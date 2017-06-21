import { connect } from 'react-redux';
import { addLectures } from '../../actions/index.js';
import { toggleCollapsed } from '../../actions/index.js';
import SidebarLectureGroup from '../../components/lecture-page/sidebarLectureGroup/sidebarLectureGroup.js';

const mapStateToProps = (state, ownProps) => {
    if(!state.lectures[ownProps.id]) {
        return {
            lectures: [],
            collapsed: true,
        }
    }

    let lectures = state.lectures[ownProps.id].lectures
    let collapsed = state.lectures[ownProps.id].collapsed

    return {
        lectures,
        collapsed
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleCollapsed: (collapsed) => {
            dispatch(toggleCollapsed(collapsed, ownProps.id));
        },
        onLecturesReceived: (lectures) => {
            dispatch(addLectures(lectures, ownProps.id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLectureGroup)
