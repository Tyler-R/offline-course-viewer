import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Lecture from '../lecture/lecture.js'
import style from './lectureGroup.scss';
import axios from 'axios';


class LectureGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            position: props.position,
            parent: props.parent,
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
        let lectures = [];

        if(this.state.lectures && !this.state.collapsed) {
            lectures = this.state.lectures.map(lecture => {
                return (
                    <Lecture
                        key={lecture.id}
                        id={lecture.id}
                        name={lecture.name}
                        parent={this}
                        position={lecture.position}
                        type={lecture.type}
                        completed={lecture.completed}>
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
