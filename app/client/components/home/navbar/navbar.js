import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import style from './navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper white">
                    <a href="#" className="navbar-logo">coursera-dl-viewer</a>
                    <ul className="right">
                        <li className="navbar-menu">Settings</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
