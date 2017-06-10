import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import style from './lecture.scss';


class Lecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            position: props.position,
            parent: props.parent,
            type: props.type,
            completed: props.completed,
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
        let iconColor = this.state.completed ? {color: "green"} : {color : "grey"};

        let playIcon = '';
        if(this.state.type === 'video') {
            playIcon = videoPlayIcon;
        } else if(this.state.type == 'reading') {
            playIcon = readingPlayIcon;
        }

        let weekId = this.state.parent.state.parent.state.id;
        let courseName = this.state.parent.state.parent.state.parent.state.name;

        // .replace(/\s+/g, '-') will replace 1 or more white spaces with a '-'
        let lecturePath = "/" + courseName.replace(/\s+/g, '-') + "/" + weekId + "/lecture/" + this.state.type + "/" + this.state.id + "/" + this.state.name.replace(/\s+/g, '-');

        return (
            <Link to={lecturePath}>
                <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                    <div>
                        <i className="material-icons lecture-icon" style={iconColor}>
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

export default Lecture;
