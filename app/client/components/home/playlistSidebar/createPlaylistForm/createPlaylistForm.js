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
        }
    }

    submitPlaylist(event) {
        axios.put('/playlist/:name', {
            params: {
                name: this.state.newPlaylistTitleText,
            }
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
        return (
            <div>
                <span className={this.state.showForm ? " hide create-playlist-form-button" : "create-playlist-form-button"}>
                    <span className="btn-floating waves-effect waves-light blue" onClick={(e) => this.showForm(e)}>
                        <i className="material-icons">
                            add
                        </i>
                    </span>
                </span>

                <form
                    className={this.state.showForm ? "create-playlist-form-container" : "hide create-playlist-form-container"}
                    onSubmit={e => this.submitPlaylist(e)}
                >
                    <input type="text" value={this.state.newPlaylistTitleText} placeholder={"Add Playlist"} onChange={(e) => this.handleNewPlaylistTitleUpdate(e)} className="create-playlist-form-title"/>

                    <span className="btn waves-effect waves-light blue left" onClick={e => this.hideForm(e)}>
                        Cancel
                    </span>

                    <button className="btn waves-effect waves-light right blue" type="submit">
                        Create
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePlaylistForm;