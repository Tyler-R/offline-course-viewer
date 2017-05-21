import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import style from './lecture.scss';


class Lecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
            type: props.type,
            completed: props.completed,
            courseName: props.courseName,
            weekName: props.weekName,
            lectureGroupName: props.lectureGroupName,
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

        console.log(playIcon);
        console.log(this.state.type);

        let lecturePath = "/" + this.state.courseName + "/" + this.state.weekName + "/" + this.state.lectureGroupName + "/" + this.state.name

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

export default Lecture;
