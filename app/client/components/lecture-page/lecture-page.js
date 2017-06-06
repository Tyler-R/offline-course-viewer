import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sidebar from './sidebar/sidebar.js';
import VideoLecture from './VideoLecture/VideoLecture.js';
import ReadingLecture from './readingLecture/readingLecture.js';

import style from './lecturePage.scss';

class LecturePage extends Component {
    constructor(props) {
        super(props);
        let params = props.match.params;
        console.log(params);

        this.state = {
            courseName: params.courseName,
            weekId: params.weekId,
            lectureId: params.lectureId,
            lectureName: params.lectureName,
            lectureType: params.lectureType
        }
    }

    render() {
        let lecture = undefined;

        if(this.state.lectureType == "video") {
            lecture = (
                <VideoLecture
                    key={this.state.lectureId}
                    id={this.state.lectureId}
                    name={this.state.lectureName}
                />
            );
        } else if(this.state.lectureType == "reading") {
            lecture = (
                <ReadingLecture />
            );
        }

        return (
            <span>
                <Sidebar key={this.state.weekId} weekId={this.state.weekId} courseName={this.state.courseName}/>
                {lecture}
            </span>
        );
    }
}

export default LecturePage;
