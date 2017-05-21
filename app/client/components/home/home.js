import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Course from './course/course.js'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        axios.get('/courses')
            .then(res => {
                const courses = res.data
                this.setState({courses});

                $(document).ready(() => {
                    // stops button and icons from expanding and collapsing the collapsible section
                    $(".collapse-disabled").click((e) => {
                        e.stopPropagation();
                    });

                    $(".dropdown").click((e) => {
                        if($(e.target).hasClass('dropdown-icon')) {
                            // dropdown icon wwas clicked do display dropdown menu
                            $(e.target).siblings(".dropdown-list").toggleClass("show");
                        } else {
                            // item in dropdown menu was clicked
                            $(e.target).parents('.dropdown-list').toggleClass("show")
                            console.log($(e.target));
                        }
                    });

                    window.onclick = (e) => {
                        if (!event.target.matches('.dropdown-icon')) {

                            let dropdowns = document.getElementsByClassName("dropdown-list");
                            for (let i = 0; i < dropdowns.length; i++) {
                                var openDropdown = dropdowns[i];
                                if (openDropdown.classList.contains('show')) {
                                    openDropdown.classList.remove('show');
                                }
                            }
                        }
                    }

                });
            });
    }

    render() {
        let courses = [];

        for(let i = 0; i < this.state.courses.length; i++) {
            let course = this.state.courses[i];
            courses.push(<Course key={course} id={i} name={course}></Course>);
        }

        return (
            <div>
                {courses}
            </div>
        );
    }
}

export default Home;
