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
            inEditMode: false,
            newName: props.name,
        }
    }

    deletePlaylist() {
        axios.delete('/playlist/:id', {
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
        axios.put('/playlist/:id/:newName', {
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

    render() {
        let editModeDisplay = (
            <form onSubmit={e => this.saveNewName()}>
                <input className="playlist-title" autoFocus value={this.state.newName} onChange={e => this.updateNewName(e)}/>
                <span className="btn waves-effect waves-light blue left" onClick={e => this.cancelEditMode()}>
                    Cancel
                </span>

                <button className="btn waves-effect waves-light right blue" type="submit">
                    Save
                </button>
            </form>
        );

        let nameDisplay = <span className="playlist-title">{this.state.name}</span>

        let settingsButton = (
            <span className="dropdown right" onClick={e => e.stopPropagation()}>
                <i className="material-icons playlist-icon">
                    settings
                </i>

                <ul id={this.state.id} className="playlist-dropdown-list">
                    <li onClick={e => this.enterEditMode()}><a>Rename</a></li>
                    <li><a href='#'>Move</a></li>
                    <li onClick={e => this.deletePlaylist()}><a>Delete</a></li>
                </ul>
            </span>
        );

        return (
            <span>
                <div className="playlist" onClick={e => this.setSelectedPlaylist(e)}>
                    <table>
                        <tbody>
                            <tr>
                                {this.state.inEditMode &&
                                    editModeDisplay
                                }


                                {!this.state.inEditMode &&
                                    nameDisplay
                                }

                                {!this.state.inEditMode &&
                                    settingsButton
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </span>
        );
    }
}

export default Playlist;
