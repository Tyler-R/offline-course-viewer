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
            completionMessageSent: false,
            completeLecture: props.completeLecture,
            videoPath: "/stream?lectureId=" + props.id
        }
    }

    handleVideoTimeProgressing() {
        let currentTime = this.videoPlayer.currentTime;

        if(currentTime / this.state.duration >= 0.9 && !this.state.completionMessageSent) {
            axios.put('/lectures/complete/:lectureId', {
                params: {
                    lectureId: this.state.id
                }
            });

            this.state.completeLecture();

            this.setState({
                completionMessageSent: true
            })
        }
    }

    setVideoDuration() {
        this.setState({
            duration: this.videoPlayer.duration
        });
    }

    render() {
        return (
            <div className="video-lecture-container">
                <div className="video-lecture-content">
                    <video
                        width="80%"
                        height="100%"
                        autoPlay
                        controls
                        preload="auto"
                        ref={(ref) => this.videoPlayer = ref}
                        onCanPlay={() => {this.setVideoDuration()}}
                        onTimeUpdate={()=>{this.handleVideoTimeProgressing()}}>
                        <source src={this.state.videoPath} type="video/mp4"></source>
                    </video>
                </div>
            </div>
        );
    }

}

export default VideoLecture;
