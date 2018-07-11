import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Course from '../../containers/home/course.js';
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

    componentDidMount() {
        if(this.state.selectedPlaylistId == undefined) {
            axios.get('/playlists')
            .then(playlistResponse => {
                let playlists = playlistResponse.data.playlists
                playlists = playlists.sort((playlist1, playlist2) => {playlist1.position > playlist2.position})

                const selectedPlaylistId = playlistResponse.data.defaultPlaylistId

                this.state.setSelectedPlaylistId(selectedPlaylistId);
                this.state.onPlaylistsReceived(playlists);
                this.getCourses(playlists, selectedPlaylistId);

            });
        } else {
            this.getCourses(this.state.selectedPlaylistId);
        }
    }

    componentDidUpdate() {
        if(this.state.courses.length == 0) {
            this.getCourses(this.state.selectedPlaylistId);
        }
    }

    getCourses(selectedPlaylistId) {
        axios.get('courses', {
            params: {
                playlistId: selectedPlaylistId
            }
        }).then((coursesResponse) => {
            const courses = coursesResponse.data;
            this.state.onCoursesReceived(courses, selectedPlaylistId);

            this.initializeJQuery();
        });
    }

    initializeJQuery() {
        $(document).ready(() => {
            $(".dropdown").off('click');
            $(".dropdown").click((e) => {
                if($(e.target).hasClass('course-settings-icon')) {
                    // dropdown icon was clicked so display dropdown menu
                    $(e.target).siblings(".course-dropdown-list").toggleClass("show");
                } else if($(e.target).hasClass('playlist-icon')) {
                    $(e.target).siblings(".playlist-dropdown-list").toggleClass('show');
                } else if($(e.target).parents('.course-dropdown-list').hasClass('show')){
                    // item in dropdown menu was clicked
                    $(e.target).parents('.course-dropdown-list').toggleClass("show")
                } else if($(e.target).parents('.playlist-dropdown-list').hasClass('show')) {
                    $(e.target).parents('.playlist-dropdown-list').toggleClass("show")
                }
            });

            window.onclick = (e) => {
                let dropdowns = []
                dropdowns.push.apply(dropdowns, document.getElementsByClassName("course-dropdown-list"));
                dropdowns.push.apply(dropdowns, document.getElementsByClassName("playlist-dropdown-list"))

                for (let i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        });
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
