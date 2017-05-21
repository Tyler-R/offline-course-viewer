import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LectureGroup from '../lectureGroup/lectureGroup.js'
import style from './week.scss';
import axios from 'axios';


class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
            courseName: props.courseName,
            lectureGroups: [],
            collapsed: true,
        }
    }

    handleClick(event) {
        if(this.state.collapsed) {
            let self = this;
            axios.get('/lectureGroups', {
                params: {
                    courseName: this.state.courseName,
                    weekName: this.state.name,
                }
            })
            .then(lectureGroups => {
                self.setState({
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
                return <LectureGroup key={lectureGroup.name} name={lectureGroup.name} position={lectureGroup.position} courseName={this.state.courseName} weekName={this.state.name}></LectureGroup>;
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
