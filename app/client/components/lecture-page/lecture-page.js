import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sidebar from './sidebar/sidebar.js'

class LecturePage extends Component {
    constructor(props) {
        super(props);
        let params = props.match.params;

        this.state = {
            courseName: params.course,
            weekName: params.week,
            moduleName: params.module,
            lectureName: params.lecture,
        }
    }

    render() {
        return (
            <span>
                <Sidebar courseName={this.state.courseName} weekName={this.state.weekName} />
            </span>
        );
    }
}

export default LecturePage;
