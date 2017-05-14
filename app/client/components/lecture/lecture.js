import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from './lecture.scss';


class Lecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
            courseName: props.courseName,
            weekName: props.weekName,
            lectureGroupName: props.lectureGroupName,
            collapsed: true,
        }
    }

    handleClick(event) {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <span>
                <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                    <div>
                        <i className="material-icons">
                            play_circle_outline
                        </i>

                        <span>
                            {this.state.name}
                        </span>


                    </div>
                </li>
            </span>
        );
    }

}

export default Lecture;
