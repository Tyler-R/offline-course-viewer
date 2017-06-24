import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import style from './playlist.scss';

const Playlist = ({id, name, position}) => {
    console.log("hello world");
    return (
        <span>
            <li className="playlist" onClick={(e) => this.handleClick(e)}>
                <div>
                    <span className="playlist-title">
                        {name}
                    </span>

                    <i className="material-icons playlist-icon">

                    </i>
                </div>
            </li>
        </span>
    );
}

export default Playlist;
