import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Playlist from './playlist/playlist.js';
import CreatePlaylistForm from './createPlaylistForm/createPlaylistForm.js';

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
