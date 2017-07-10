import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Course from './course/course.js';
import Navbar from './navbar/navbar.js';
import PlaylistSidebar from './playlistSidebar/playlistSidebar.js';

class Home extends Component {
    constructor(props) {
        super(props);

        this.initializeState(props);
    }

    componentWillReceiveProps(props) {
        this.initializeState(props);
    }

    initializeState(props) {
        this.state = {
            courses: props.courses,
            playlists: props.playlists,
            selectedPlaylistId: props.selectedPlaylistId,
            onPlaylistsReceived: props.onPlaylistsReceived,
            onCoursesReceived: props.onCoursesReceived,
            setSelectedPlaylistId: props.setSelectedPlaylistId,
        }
    }

    getCourses(playlists, selectedPlaylistId) {
        axios.get('courses', {
            params: {
                playlistId: selectedPlaylistId
            }
        }).then((coursesResponse) => {

            const courses = coursesResponse.data;
            this.state.onCoursesReceived(courses);

            this.setState({
                playlists,
                courses,
            });

            this.initializeJQuery();

        });
    }

    initializeJQuery() {
        $(document).ready(() => {
            // stops button and icons from expanding and collapsing the collapsible section
            $(".collapse-disabled").click((e) => {
                e.stopPropagation();
            });

            $(".dropdown").click((e) => {
                if($(e.target).hasClass('dropdown-icon')) {
                    // dropdown icon wwas clicked do display dropdown menu
                    $(e.target).siblings(".course-dropdown-list").toggleClass("show");
                } else {
                    // item in dropdown menu was clicked
                    $(e.target).parents('.course-dropdown-list').toggleClass("show")
                }
            });

            window.onclick = (e) => {
                if (!event.target.matches('.dropdown-icon')) {

                    let dropdowns = document.getElementsByClassName("course-dropdown-list");
                    for (let i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }
        });
    }

    componentDidMount() {
        if(this.state.selectedPlaylistId == undefined) {
            axios.get('/playlists')
            .then(playlistResponse => {
                const playlists = playlistResponse.data.playlists
                const selectedPlaylistId = playlistResponse.data.defaultPlaylistId

                this.getCourses(playlists, selectedPlaylistId);
                this.state.onPlaylistsReceived(playlists);
                this.state.setSelectedPlaylistId(selectedPlaylistId);
            });
        } else {
            this.getCourses(this.state.playlists, this.state.selectedPlaylistId);
        }
    }

    componentDidUpdate() {
        if(this.state.courses.length == 0) {
            this.getCourses(this.state.playlists, this.state.selectedPlaylistId);
        }
    }

    render() {
        let courses = [];

        this.state.courses.forEach(course => {
            courses.push(<Course key={course.id} id={course.id} name={course.name} />);
        });

        this.initializeJQuery();

        return (
            <div>
                <Navbar />
                <PlaylistSidebar playlists={this.state.playlists}/>
                {courses}
            </div>
        );
    }
}

export default Home;
