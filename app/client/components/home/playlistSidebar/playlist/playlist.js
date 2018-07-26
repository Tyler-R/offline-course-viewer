import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from './playlist.scss';
import dropdownStyle from '../../dropdown/dropdown.scss';

class Playlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            name: props.name,
            position: props.position,
            setSelectedPlaylistId: props.setSelectedPlaylistId,
            deletePlaylist: props.deletePlaylist,
            setNewName: props.setNewName,
            swapPlaylistPositions: props.swapPlaylistPositions,
            inEditMode: false,
            inMoveMode: false,
            newName: props.name,
        }
    }

    deletePlaylist() {
        axios.delete('/playlists/:id', {
            params: {
                id: this.state.id
            }
        }).then(() => {
            this.state.deletePlaylist(this.state.id)
        }).catch(err => {
            alert("You can not delete the default playlist");
        });
    }

    setSelectedPlaylist(event) {
        if(this.state.inEditMode) {
            event.stopPropagation();
        } else {
            this.state.setSelectedPlaylistId(this.state.id)
        }
    }

    enterEditMode() {
        this.setState({
            inEditMode: true,
        });
    }

    cancelEditMode() {
        this.setState({
            inEditMode: false,
            newName: this.state.name,
        });
    }

    updateNewName(event) {
        this.setState({
            newName: event.target.value,
        });
    }

    saveNewName() {
        axios.put('/playlists/:id/:newName', {
            params: {
                id: this.state.id,
                newName: this.state.newName
            }
        }).then(() => {
            this.state.setNewName(this.state.id, this.state.newName)
            this.setState({
                name: this.state.newName,
                inEditMode: false,
            });
        }).catch(err => {
            alert("Failed to update playlist Name")
            console.log(err);
            this.setState({
                inEditMode: false,
            })
        })
    }

    handlePlaylistClicked(event) {
        if(!this.state.inMoveMode) {
            this.setSelectedPlaylist(event)
        }
    }

    enterMoveMode() {
        this.setState({
            inMoveMode: true,
        });
    }

    cancelMoveMode() {
        this.setState({
            inMoveMode: false,
        });
    }

    startDrag(event) {
        event.dataTransfer.setData("text", this.state.id);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();
        let draggedPlaylistId = event.dataTransfer.getData("text");

        axios.put('/playlists/swap/:id/:id2', {
            params: {
                id: this.state.id,
                id2: draggedPlaylistId
            }
        }).then(() => {
            this.state.swapPlaylistPositions(draggedPlaylistId, this.state.id);
        }).catch(err => {
            alert("Failed to move playlist");
        });
    }

    render() {
        let renamePlaylistForm = (
            <tr>
                <form onSubmit={e => this.saveNewName()}>
                    <input className="playlist-title" autoFocus value={this.state.newName} onChange={e => this.updateNewName(e)}/>
                    <span className="btn waves-effect waves-light blue left" onClick={e => this.cancelEditMode()}>
                        Cancel
                    </span>

                    <button className="btn waves-effect waves-light right blue" type="submit">
                        Save
                    </button>
                </form>
            </tr>
        );

        let playlistDisplay = (
            <tr>
                <span className="playlist-title">{this.state.name}</span>

                <span className="dropdown right" onClick={e => e.stopPropagation()}>
                    <i className="material-icons playlist-icon">
                        settings
                    </i>

                    <ul id={this.state.id} className="playlist-dropdown-list">
                        <li onClick={e => this.enterEditMode()}><a>Rename</a></li>
                        <li onClick={e => this.enterMoveMode()}><a>Move</a></li>
                        <li onClick={e => this.deletePlaylist()}><a>Delete</a></li>
                    </ul>
                </span>
            </tr>
        );

        let moveDisplay = (
            <tr>
                <span className="playlist-title">{this.state.name}</span>
                    <i className="material-icons playlist-icon hovering-hand" onClick={e => this.cancelMoveMode()}>
                        clear
                    </i>
            </tr>
        );

        return (
            <span>
                <div    className={this.state.inMoveMode ? "playlist-move-mode" : "playlist"}
                        draggable={this.state.inMoveMode}
                        onDragStart={e => this.startDrag(e)}
                        onDrop={e => this.handleDrop(e)}
                        onDragOver={e => this.onDragOver(e)}
                        onDragEnd={e => this.cancelMoveMode()}
                        onClick={e => this.handlePlaylistClicked(e)}
                >
                    <table>
                        <tbody>
                            {this.state.inEditMode && !this.state.inMoveMode &&
                                renamePlaylistForm
                            }

                            {!this.state.inEditMode && !this.state.inMoveMode &&
                                playlistDisplay
                            }

                            {this.state.inMoveMode &&
                                moveDisplay
                            }
                        </tbody>
                    </table>
                </div>
            </span>
        );
    }
}

export default Playlist;
