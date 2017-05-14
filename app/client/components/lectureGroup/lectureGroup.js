import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from './lectureGroup.scss';
import axios from 'axios';


class LectureGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
            courseName: props.courseName,
            weekname: props.weekName,
            lectures: [],
            collapsed: true,
        }
    }

    handleClick(event) {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        return (
            <span>
                <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                    <div>
                        <span>
                            {this.state.name}
                        </span>

                        <i className="material-icons right">
                            {collapseIconName}
                        </i>
                    </div>
                </li>
            </span>
        );
    }

}

export default LectureGroup;
