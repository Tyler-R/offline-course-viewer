import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import style from './playlist.scss';
import dropdownStyle from '../../dropdown/dropdown.scss';

function showSettings(event) {
    event.stopPropagation();
    console.log("settings");
}

const Playlist = ({id, name, position, setSelectedPlaylistId}) => {
    return (
        <span>
            <div className="playlist" onClick={(e) => setSelectedPlaylistId(id)}>
                <table>
                    <tbody>
                        <tr>
                            <span className="playlist-title">
                                {name}
                            </span>

                            <span className="dropdown right" onClick={e => e.stopPropagation()}>
                                <i className="material-icons playlist-icon">
                                    settings
                                </i>

                                <ul id={id} className="playlist-dropdown-list">
                                    <li><a href="#">Rename</a></li>
                                    <li><a href='#'>Move</a></li>
                                    <li><a href='#'>Delete</a></li>
                                </ul>
                            </span>
                        </tr>
                    </tbody>
                </table>
            </div>
        </span>
    );
}

export default Playlist;
