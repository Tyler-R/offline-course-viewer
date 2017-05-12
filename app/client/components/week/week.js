import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        }
    }

    render() {
        return (
            <div>{props.name}</div>
        );
    }

}

export default Week;
