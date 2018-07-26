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
            newName: props.name,
            weeks: [],
            playlistId: props.playlistId,
            playlists: props.playlists,
            deleteCourse: props.deleteCourse,
            renameCourse: props.renameCourse,
            addCourseToPlaylist: props.addCourseToPlaylist,
            swapCoursePositions: props.swapCoursePositions,
            collapsed: true,
            inEditMode: false,
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
        axios.delete('/courses/:id', {
            params: {
                id: this.state.id,
            }
        }).then(() => {
            this.state.deleteCourse(this.state.playlistId);
        }).catch((err) => {
            console.log(err);
        });
    }

    enterEditMode() {
        this.setState({
            inEditMode: true,
        });
    }

    cancelEditMode() {
        this.setState({
            inEditMode: false,
            newName: this.state.name,
        });
    }

    updateNewName(event) {
        this.setState({
            newName: event.target.value,
        });
    }

    renameCourse(event) {
        if(this.state.newName == this.state.name) {
            this.cancelEditMode();
        }

        axios.put('/courses/:id/:name', {
            params: {
                id: this.state.id,
                name: this.state.newName,
            }
        }).then(() => {
            this.state.renameCourse(this.state.playlistId, this.state.newName);
        }).catch(err => {
            console.log(err);
        });
    }

    toggleSettingsDropdown(event) {
        let target = $(event.target)

        let dropdownButtonClicked = target.hasClass('course-settings-icon')
        let dropdownItemClicked = target.parents('.course-dropdown-list').hasClass('show')

        if(dropdownButtonClicked) {
            // dropdown icon was clicked so display dropdown menu
            target.siblings(".course-dropdown-list").toggleClass("show");
        } else if(dropdownItemClicked) {
            // item in dropdown menu was clicked so hide dropdown
            target.parents('.course-dropdown-list').toggleClass("show")
        }
    }

    render() {
        let weeks = [];
        if (this.state.weeks && !this.state.collapsed) {
            weeks = this.state.weeks.map(week => {
                return <Week key={week.id} id={week.id} name={week.name} parent={this} position={week.position}></Week>;
            });
        }

        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        let optionsMenu = (
            <td className="dropdown right" onClick={e => e.stopPropagation()}>
                <i className="material-icons black-text course-settings-icon" onClick={e => this.toggleSettingsDropdown(e)}>
                    settings
                </i>

                <ul id={this.state.id} className="course-dropdown-list" onClick={e => this.toggleSettingsDropdown(e)}>
                    <li onClick={e => this.enterEditMode()}><a>Rename</a></li>
                    <li><a href='#'>Move</a></li>
                    <li onClick={e => this.deleteCourse(e)}><a>Delete</a></li>
                    <li><a href='#'>Add to Playlist</a></li>
                </ul>
            </td>
        );

        let renameCourseForm = (
            <tr onClick={e => e.stopPropagation()}>
                <td>
                    <form className="course-rename-form" onSubmit={e => this.renameCourse()}>
                        <input className="course-name" autoFocus value={this.state.newName} onChange={e => this.updateNewName(e)}/>
                        <span className="btn waves-effect waves-light blue left" onClick={e => this.cancelEditMode()}>
                            Cancel
                        </span>

                        <button className="btn waves-effect waves-light right blue" type="submit">
                            Save
                        </button>
                    </form>
                </td>
            </tr>
        );

        let courseDisplay = (
            <tr>
                <td className="material-icons course-dropdown-icon">
                    {collapseIconName}
                </td>
                <td className="course-name">
                    {this.state.name}
                </td>

                {optionsMenu}
            </tr>
        );

        return (
            <span className='row'>
                <div className='col s6 offset-s3'>
                    <li className="course-container collection-header" onClick={(e) => this.handleClick(e)}>
                        <table>
                            <tbody>

                                {!this.state.inEditMode && courseDisplay}

                                {this.state.inEditMode && renameCourseForm}

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
