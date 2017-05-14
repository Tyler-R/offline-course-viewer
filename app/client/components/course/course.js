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
            collapsed: true
        };
    }

    handleClick(event) {
        if(this.state.collapsed) {
            axios.get('/weeks', {
                params: {
                    courseName: this.state.name
                }
            })
            .then(response => {
                console.log(response);
            });
        }



        this.setState({
            id: this.state.id,
            name: this.state.name,
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let weeks = [];
        if (this.state.weeks) {
            weeks = this.state.weeks.map(week => {
                return <Week key={week.name} name={week.name}></Week>;
            });
        }

        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        // chevron_right expand_more
        return (
            <span className='row'>
                <div className='col s6 offset-s3'>
                    <ul className="collapsible popout" data-collapsible="accordion">
                        <li className="disabled">
                            <span className="collapsible-header course-container" onClick={(e) => this.handleClick(e)}>
                                <div>
                                    <i className="material-icons">
                                        {collapseIconName}
                                    </i>
                                    <span>
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

                            </span>

                            <div className="collapsible-body">
                                {weeks}
                          </div>
                        </li>
                    </ul>


                </div>
            </span>
        );
    }
}

export default Course;
