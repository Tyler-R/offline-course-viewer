import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import style from './playlist.scss';

function showSettings(event) {
    event.stopPropagation();
    console.log("settings");
}

const Playlist = ({id, name, position, setSelectedPlaylistId}) => {
    return (
        <span>
            <li className="playlist" onClick={(e) => setSelectedPlaylistId(id)}>
                <div>
                    <span className="playlist-title">
                        {name}
                    </span>

                    <i className="material-icons playlist-icon" onClick={(e) => showSettings(e)}>
                        settings
                    </i>
                </div>
            </li>
        </span>
    );
}

export default Playlist;
