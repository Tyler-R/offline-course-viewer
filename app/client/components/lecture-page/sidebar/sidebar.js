import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LectureGroup from '../../home/lectureGroup/lectureGroup.js'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseName: props.courseName,
            weekName: props.weekName,
            lectureGroups: []
        }
    }

    componentDidMount() {
        if(this.state.lectureGroups.length < 1) {
            axios.get('/lectureGroups', {
                params: {
                    courseName: this.state.courseName,
                    weekName: this.state.weekName,
                }
            })
            .then(lectureGroups => {
                this.setState({
                    lectureGroups: lectureGroups.data,
                });
            });
        }
    }


    render() {
        let lectureGroups = [];

        if(this.state.lectureGroups) {
            lectureGroups = this.state.lectureGroups.map(lectureGroup => {
                return (
                    <LectureGroup
                        key={lectureGroup.name}
                        name={lectureGroup.name}
                        position={lectureGroup.position}
                        courseName={this.state.courseName}
                        weekName={this.state.weekName}>
                    </LectureGroup>
                );
            });
        }

        return (
            <div>
                <ul className="side-nav fixed">
                    {lectureGroups}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
