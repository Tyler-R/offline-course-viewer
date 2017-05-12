import React from 'react';
import ReactDOM from 'react-dom';

window.$ = window.jQuery = require('materialize-css/node_modules/jquery/dist/jquery.js');
require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');
require('materialize-css/js/init.js');

import App from "./client/App.js";

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
