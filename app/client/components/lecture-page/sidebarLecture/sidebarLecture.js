import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import style from './sidebarLecture.scss';


class SidebarLecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            position: props.position,
            type: props.type,
            completed: props.completed,
            weekId: props.weekId,
            courseName: props.courseName,
            collapsed: true,
        }
    }

    handleClick(event) {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let videoPlayIcon = this.state.completed ? "play_circle_filled" : "play_circle_outline";
        let readingPlayIcon = "chrome_reader_mode";

        let playIcon = '';
        if(this.state.type === 'video') {
            playIcon = videoPlayIcon;
        } else if(this.state.type == 'reading') {
            playIcon = readingPlayIcon;
        }

        // .replace(/\s+/g, '-') will replace 1 or more white spaces with a '-'
        let lecturePath = "/" + this.state.courseName.replace(/\s+/g, '-') + "/" + this.state.weekId + "/lecture/" + this.state.id + "/" + this.state.name.replace(/\s+/g, '-');

        return (
            <Link to={lecturePath}>
                <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                    <div>
                        <i className="material-icons lecture-icon">
                            {playIcon}
                        </i>

                        <span className="lecture-title">
                            {this.state.name}
                        </span>
                    </div>
                </li>
            </Link>
        );
    }

}

export default SidebarLecture;
