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
            <div className="video-lecture-container">
                <div className="video-lecture-content">
                    <video
                        id="my-player"
                        className="video-js"
                        width="80%"
                        height="100%"
                        controls
                        preload="auto">
                        <source src={this.state.videoPath} type="video/mp4"></source>
                    </video>
                </div>
            </div>
        );
    }

}

export default VideoLecture;
