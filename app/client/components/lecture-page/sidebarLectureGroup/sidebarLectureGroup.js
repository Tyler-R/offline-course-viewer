import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SidebarLecture from '../sidebarLecture/sidebarLecture.js'
import style from './sidebarLectureGroup.scss';

class SidebarLectureGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            position: props.position,
            weekId: props.weekId,
            courseName: props.courseName,
            lectures: [],
            collapsed: true,
        }
    }

    handleClick(event) {
        if(this.state.collapsed) {
            axios.get('/lectures', {
                params: {
                    lectureGroupId: this.state.id
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
        let sidebarLectures = [];

        if(this.state.lectures && !this.state.collapsed) {
            sidebarLectures = this.state.lectures.map(lecture => {
                return (
                    <SidebarLecture
                        key={lecture.id}
                        id={lecture.id}
                        name={lecture.name}
                        position={lecture.position}
                        type={lecture.type}
                        completed={lecture.completed}
                        weekId={this.state.weekId}
                        courseName={this.state.courseName}
                    />
                );
            });
        }


        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        return (
            <span>

                <li className="sidebar-lecture-group" onClick={(e) => this.handleClick(e)}>
                    <div>
                        <span className="sidebar-lecture-group-title">
                            {this.state.name}
                        </span>

                        <i className="material-icons sidebar-lecture-group-icon">
                            {collapseIconName}
                        </i>
                    </div>
                </li>



                {sidebarLectures.length > 0 &&
                    <ul className="collection">
                        {sidebarLectures}
                    </ul>
                }


            </span>
        );
    }

}

export default SidebarLectureGroup;
