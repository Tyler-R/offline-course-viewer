import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LectureGroup from '../lectureGroup/lectureGroup.js'
import style from './week.scss';
import axios from 'axios';


class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            position: props.position,
            parent: props.parent,
            lectureGroups: [],
            collapsed: true,
        }
    }

    handleClick(event) {
        if(this.state.collapsed) {
            axios.get('/lectureGroups', {
                params: {
                    weekId: this.state.id
                }
            })
            .then(lectureGroups => {
                this.setState({
                    lectureGroups: lectureGroups.data,
                });
            });
        }

        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let lectureGroups = [];

        if(this.state.lectureGroups && !this.state.collapsed) {
            lectureGroups = this.state.lectureGroups.map(lectureGroup => {
                return (
                    <LectureGroup
                        key={lectureGroup.id}
                        id={lectureGroup.id}
                        name={lectureGroup.name}
                        position={lectureGroup.position}
                        parent={this}>
                    </LectureGroup>
                );
            });
        }

        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        return (
            <span>
            <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                <div className="week-top-strip">
                    <span className="white-text">
                        Week {this.state.position}
                    </span>

                    <i className="material-icons right white-text">
                        {collapseIconName}
                    </i>
                </div>

                <div className="week-name">
                    {this.state.name}
                </div>
            </li>

            {lectureGroups.length > 0 &&
                <ul className="collection">
                    {lectureGroups}
                </ul>
            }

            </span>
        );
    }

}

export default Week;
