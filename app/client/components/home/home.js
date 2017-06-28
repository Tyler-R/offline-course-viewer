import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Course from './course/course.js';
import Navbar from './navbar/navbar.js';
import PlaylistSidebar from './playlistSidebar/playlistSidebar.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            playlists: [],
        }
    }

    componentDidMount() {
        axios.get('/playlists')
        .then(playlistResponse => {
            const playlists = playlistResponse.data.playlists
            let selectedPlaylistId = playlistResponse.data.defaultPlaylistId

            axios.get('courses', {
                params: {
                    playlistId: selectedPlaylistId
                }
            }).then((coursesResponse) => {

                const courses = coursesResponse.data;
                this.setState({
                    playlists,
                    courses
                });


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
        });
    }

    render() {
        let courses = [];

        this.state.courses.forEach(course => {
            courses.push(<Course key={course.id} id={course.id} name={course.name} />);
        });

        console.log("rendering");
        console.log(this.state);

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
