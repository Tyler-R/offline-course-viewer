import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from './navbar.scss';
import dropdown from '../dropdown/dropdown.scss'

let addDownloadedCoursesToApp:any;

// only import electron functions if we are in the electron build.
// If we try to import electron functions into a web app it will crash.
if (!process.env.web_build) {
    addDownloadedCoursesToApp = require('../../../electron/courseAdder.js').addDownloadedCoursesToApp
} else {
    addDownloadedCoursesToApp = (addCourseToPlaylist) => {
        M.toast({
            html: '<b>This option only works in the Electron application.</b>', 
            classes: 'red rounded', 
            displayLength: 4000,
        });
    }
}

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.initializeState(props);
    }

    componentWillReceiveProps(props) {
        this.initializeState(props);
    }

    initializeState(props) {
        this.state = {
            addCourseToPlaylist: props.addCourseToPlaylist,
        };
    }
    addCourseraCourses() {
        addDownloadedCoursesToApp(this.state.addCourseToPlaylist);
    }

    componentDidMount() {
        $(document).ready(() => {
            $(".navbar-menu").dropdown();
        });
    }

    render() {
        return (
            <div className="navbar-fixed">
                <ul id="navbar-dropdown" className="right navbar-dropdown-list">
                    <li onClick={e => this.addCourseraCourses()}><a className="black-text">Add coursera-dl Course(s)</a></li>
                </ul>

                <nav>
                    <div className="nav-wrapper white">
                        <a href="#" className="navbar-logo">coursera-dl-viewer</a>
                        <span className="navbar-menu right" data-activates="navbar-dropdown">Settings</span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
