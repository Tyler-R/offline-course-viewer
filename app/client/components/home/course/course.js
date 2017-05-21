import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Week from '../week/week.js';
import style from './course.scss';
import axios from 'axios';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            weeks: [],
            collapsed: true,
        };
    }

    handleClick(event) {
        if(this.state.collapsed) {
            let self = this;
            axios.get('/weeks', {
                params: {
                    courseName: this.state.name
                }
            })
            .then(weeks => {
                self.setState({
                    weeks: weeks.data,
                });
            });
        }

        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let weeks = [];
        if (this.state.weeks && !this.state.collapsed) {
            weeks = this.state.weeks.map(week => {
                return <Week key={week.name} name={week.name} position={week.position} courseName={this.state.name}></Week>;
            });
        }

        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        // chevron_right expand_more
        return (
            <span className='row'>
                <div className='col s6 offset-s3'>
                    <ul className="collection with-header">
                        <li className="course-container collection-header" onClick={(e) => this.handleClick(e)}>
                            <div>
                                <i className="material-icons course-dropdown-icon">
                                    {collapseIconName}
                                </i>
                                <span className="course-name">
                                    {this.state.name}
                                </span>

                                <div className="dropdown right collapse-disabled">
                                    <i className="material-icons black-text dropdown-icon">
                                        settings
                                    </i>

                                    <ul id={this.state.id} className="dropdown-list">
                                        <li><a href="#!">edit name</a></li>
                                        <li><a href='#!'>move</a></li>
                                    </ul>
                                </div>
                            </div>

                            <a href="#" className="btn right bottom-button collapse-disabled">Go to Course</a>

                        </li>
                        {weeks.length > 0 &&
                            <ul className="collection">
                                {weeks}
                            </ul>
                        }
                    </ul>


                </div>
            </span>
        );
    }
}

export default Course;