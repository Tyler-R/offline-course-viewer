import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sidebar from './sidebar/sidebar.js'

class LecturePage extends Component {
    constructor(props) {
        super(props);
        let params = props.match.params;

        this.state = {
            courseName: params.courseName,
            weekId: params.weekId,
            lectureId: params.lectureId,
            lectureName: params.lectureName,
        }
    }

    render() {
        return (
            <span>
                <Sidebar key={this.state.weekId} weekId={this.state.weekId}/>

            </span>
        );
    }
}

export default LecturePage;
