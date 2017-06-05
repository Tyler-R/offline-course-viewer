import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import style from './videoLecture.scss';
// import Video from 'video-js'

class VideoLecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            videoPath: "/stream?lectureId=" + props.id
        }
    }

    render() {
        console.log('video loading from: ' + this.state.id);

        return (
            <div className="video-lecture-content">
                <video
                    id="my-player"
                    className="video-js"
                    controls
                    preload="auto">
                    <source src={this.state.videoPath} type="video/mp4"></source>
                </video>
            </div>
        );
    }

}

export default VideoLecture;
