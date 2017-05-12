import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Course from './components/course/course.js'

class App extends Component {
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
                    $('.collapsible').collapsible();
                    $('.dropdown-button').dropdown({
                        stopPropagation: true,
                        belowOrigin: true,
                        alignment: 'right',
                        inDuration: 200,
                        outDuration: 150,
                        constrainWidth: false,
                        hover: true,
                        gutter: 1,
                    });

                    // var $panel_headers = $('.collapsible').find('> li > .collapsible-header');
                    /*$(".collapsible > li > .collapsible-header > a").click(function(e) {
                        console.log(e);
                        console.log(e.target);
                        e.stopPropagation();
                    })*/

                    // stops button and icons from expanding and collapsing the collapsible section
                    $(".collapsible > li > .collapsible-header > .collapse-disabled").click(function(e) {
                        console.log(e);
                        e.stopPropagation();
                    })

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

export default App;
