import { connect } from 'react-redux';
import { completeLecture } from '../../actions/index.js';
import VideoLecture from '../../components/lecture-page/videoLecture/videoLecture.js';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        completeLecture: () => {
            dispatch(completeLecture(ownProps.id))
        }
    }
}

export default connect(null, mapDispatchToProps)(VideoLecture)
