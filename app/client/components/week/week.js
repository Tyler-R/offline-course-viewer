import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
        }
    }

    render() {
        return (
            <div>{this.state.name}</div>
        );
    }

}

export default Week;
