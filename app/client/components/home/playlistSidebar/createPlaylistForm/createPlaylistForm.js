import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from './CreatePlaylistForm.scss';

class CreatePlaylistForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            newPlaylistTitleText: "",
            onPlaylistCreated: props.onPlaylistCreated,
        }
    }

    submitPlaylist(event) {
        axios.post('/playlists/:name', {
            params: {
                name: this.state.newPlaylistTitleText,
            }
        }).then((playlist) => {
            this.state.onPlaylistCreated(playlist.data)
        }).catch(err => {
            alert("Could not create playlist.");
        });

        this.setState({
            showForm: false,
            newPlaylistTitleText: ""
        });
    }

    showForm(event) {
        this.setState({
            showForm: true,
        });
    }

    hideForm(event) {
        this.setState({
            showForm: false,
        });
    }

    handleNewPlaylistTitleUpdate(event) {
        this.setState({
            newPlaylistTitleText: event.target.value,
        });
    }

    render() {
        let showFormButton = (
            <span className={this.state.showForm ? " hide create-playlist-form-button" : "create-playlist-form-button"}>
                <span className="btn-floating waves-effect waves-light blue" onClick={(e) => this.showForm(e)}>
                    <i className="material-icons">
                        add
                    </i>
                </span>
            </span>
        );

        let addPlaylistForm = (
            <form
                className={this.state.showForm ? "create-playlist-form-container" : "hide create-playlist-form-container"}
                onSubmit={e => this.submitPlaylist(e)}
            >
                <input autoFocus type="text" value={this.state.newPlaylistTitleText} placeholder={"Add Playlist"} onChange={(e) => this.handleNewPlaylistTitleUpdate(e)} className="create-playlist-form-title"/>

                <span className="btn waves-effect waves-light blue left" onClick={e => this.hideForm(e)}>
                    Cancel
                </span>

                <button className="btn waves-effect waves-light right blue" type="submit">
                    Create
                </button>
            </form>
        );


        return (
            <div>
                {!this.state.showForm &&
                    showFormButton
                }

                {this.state.showForm &&
                    addPlaylistForm
                }
            </div>
        );
    }
}

export default CreatePlaylistForm;
