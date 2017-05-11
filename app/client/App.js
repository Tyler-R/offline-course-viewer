import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        axios.get('/courses')
            .then(res => {
                const courses = res.data
                this.setState({courses});
            });
    }

    render() {
        let courses = [];
        this.state.courses.forEach(course => {
            courses.push(<p key={course}>{course}</p>);
        });

        return (
            <div>
                {courses}
            </div>
        );
    }
}

export default App;
