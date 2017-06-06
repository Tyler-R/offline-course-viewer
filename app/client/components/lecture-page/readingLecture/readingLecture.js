import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from './readingLecture.scss';


class ReadingLecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
        }
    }

    render() {
        return (
            <div></div>
        );
    }

}

export default ReadingLecture;
