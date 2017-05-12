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


        // console.log(materialize);
        // console.log(JSON.stringify(materialize));
    }

    displayCourseSettings(event) {
        console.log("display settings for " + this.state.name);
        console.log(event);
        console.log(event.target)
        event.stopPropagation();
    }

    handleClick(event) {
        console.log("expanding / contracting" + this.state.name);
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

                                    <a className="dropdown-button btn-floating btn-sm white z-depth-0 right" data-activates={this.state.id}>
                                        <i className="material-icons black-text" onClick={(e) => {this.displayCourseSettings(e)}}>
                                            settings
                                        </i>
                                    </a>

                                    <ul id={this.state.id} className='dropdown-content'>
                                        <li><a className="collapse-disabled" onClick={(e) => {this.displayCourseSettings(e)}}>edit name</a></li>
                                        <li><a href='#'>move</a></li>
                                    </ul>
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
