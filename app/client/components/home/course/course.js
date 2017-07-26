import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Week from '../week/week.js';
import style from './course.scss';
import dropdownStyle from '../dropdown/dropdown.scss';
import axios from 'axios';

class Course extends Component {
    constructor(props) {
        super(props);

        this.initializeState(props);
    }

    componentWillReceiveProps(props) {
        this.initializeState(props);
    }

    initializeState(props) {
        this.state = {
            id: props.id,
            name: props.name,
            weeks: [],
            playlistId: props.playlistId,
            playlists: props.playlists,
            deleteCourse: props.deleteCourse,
            addCourseToPlaylist: props.addCourseToPlaylist,
            swapCoursePositions: props.swapCoursePositions,
            collapsed: true,
        };
    }

    handleClick(event) {
        if(this.state.collapsed) {
            axios.get('/weeks', {
                params: {
                    courseId: this.state.id
                }
            }).then(weeks => {
                this.setState({
                    weeks: weeks.data,
                });
            });
        }

        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    deleteCourse(event) {
        this.state.deleteCourse();
    }

    render() {
        let weeks = [];
        if (this.state.weeks && !this.state.collapsed) {
            weeks = this.state.weeks.map(week => {
                return <Week key={week.id} id={week.id} name={week.name} parent={this} position={week.position}></Week>;
            });
        }

        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        // chevron_right expand_more
        return (
            <span className='row'>
                <div className='col s6 offset-s3'>
                    <li className="course-container collection-header" onClick={(e) => this.handleClick(e)}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="material-icons course-dropdown-icon">
                                        {collapseIconName}
                                    </td>
                                    <td className="course-name">
                                        {this.state.name}
                                    </td>

                                    <td className="dropdown right" onClick={e => e.stopPropagation()}>
                                        <i className="material-icons black-text course-settings-icon">
                                            settings
                                        </i>

                                        <ul id={this.state.id} className="course-dropdown-list">
                                            <li><a>Rename</a></li>
                                            <li><a href='#'>Move</a></li>
                                            <li onClick={e => this.deleteCourse(e)}><a>Delete</a></li>
                                            <li><a href='#'>Add to Playlist</a></li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </li>
                    {weeks.length > 0 &&
                        <ul className="collection">
                            {weeks}
                        </ul>
                    }

                </div>
            </span>
        );
    }
}

export default Course;
