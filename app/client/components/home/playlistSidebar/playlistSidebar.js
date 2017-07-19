import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Playlist from '../../../containers/home/playlist.js';
import CreatePlaylistForm from '../../../containers/home/createPlaylistForm.js';

import style from './playlistSidebar.scss';

const PlaylistSidebar = ({ playlists }) => {
    let playlistsDOM = playlists.map(playlist => {
        return (
            <Playlist
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                position={playlist.position}
            />
        );
    });

    return (
        <div className="playlist-sidebar-nav">
            <div className="playlist-sidebar-title">
                Playlists
            </div>

            {playlistsDOM}
            <CreatePlaylistForm />
        </div>
    );
}

export default PlaylistSidebar;
