import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from './navbar.scss';
import dropdown from '../dropdown/dropdown.scss'

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    addCourseraCourse() {

    }

    addCourseraCourses() {

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
                    <li onClick={e => this.addCourseraCourse()}><a className="black-text">Add coursera-dl Course</a></li>
                    <li onClick={e => this.addCourseraCourses()}><a className="black-text">Add coursera-dl Courses</a></li>
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
