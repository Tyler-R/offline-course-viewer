import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';

import Home from './components/home/home.js';
import LecturePage from './components/lecture-page/lecture-page.js';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact={true} path='/' component={Home}/>
                    <Route path="/:course/:week/:lectureGroup/:lecture" component={LecturePage}/>

                </div>

            </Router>
        );
    }
}

export default App;
