import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Lecture from '../lecture/lecture.js'
import style from './lectureGroup.scss';
import axios from 'axios';


class LectureGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
            courseName: props.courseName,
            weekName: props.weekName,
            lectures: [],
            collapsed: true,
        }
    }

    handleClick(event) {
        if(this.state.collapsed) {
            axios.get('/lectures', {
                params: {
                    courseName: this.state.courseName,
                    weekName: this.state.weekName,
                    lectureGroupName: this.state.name,
                }
            })
            .then(lectures => {
                this.setState({
                    lectures: lectures.data,
                });
            });
        }

        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let lectures = [];

        if(this.state.lectures && !this.state.collapsed) {
            console.log(this.state.lectures);
            lectures = this.state.lectures.map(lecture => {
                return (
                    <Lecture
                        key={lecture.name}
                        name={lecture.name}
                        position={lecture.position}
                        type={lecture.type}
                        completed={lecture.completed}
                        courseName={this.state.courseName}
                        weekName={this.state.weekName}
                        lectureGroupName={this.state.name}>
                    </Lecture>
                );
            });
        }


        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        return (
            <span>
                <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                    <div>
                        <span>
                            {this.state.name}
                        </span>

                        <i className="material-icons right">
                            {collapseIconName}
                        </i>
                    </div>
                </li>

                {lectures.length > 0 &&
                    <ul className="collection">
                        {lectures}
                    </ul>
                }


            </span>
        );
    }

}

export default LectureGroup;
