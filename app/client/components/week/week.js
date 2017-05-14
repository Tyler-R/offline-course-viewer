import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from './week.scss';


class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            position: props.position,
            collapsed: true,
        }
    }

    handleClick(event) {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {

        let collapseIconName = this.state.collapsed ? "chevron_right" : "expand_more";

        return (
            <li className="collection-item" onClick={(e) => this.handleClick(e)}>
                <div className="week-top-strip">
                    <span className="white-text">
                        Week {this.state.position}
                    </span>

                    <i className="material-icons right white-text">
                        {collapseIconName}
                    </i>
                </div>

                <div className="week-name">
                    {this.state.name}
                </div>
            </li>
        );
    }

}

export default Week;
