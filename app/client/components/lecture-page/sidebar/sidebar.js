import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SidebarLectureGroup from '../sidebarLectureGroup/sidebarLectureGroup.js'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weekId: props.weekId,
            courseName: props.courseName,
            lectureGroups: []
        }
    }

    componentDidMount() {
        if(this.state.lectureGroups.length < 1) {
            axios.get('/lectureGroups', {
                params: {
                    weekId: this.state.weekId,
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
        let sidebarlectureGroups = [];

        if(this.state.lectureGroups) {
            sidebarlectureGroups = this.state.lectureGroups.map(lectureGroup => {
                return (
                    <SidebarLectureGroup
                        key={lectureGroup.id}
                        id={lectureGroup.id}
                        name={lectureGroup.name}
                        position={lectureGroup.position}
                        weekId={this.state.weekId}
                        courseName={this.state.courseName}>
                    </SidebarLectureGroup>
                );
            });
        }

        return (
            <div>
                <ul className="side-nav fixed">
                    {sidebarlectureGroups}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
