import React from 'react';
import classNames from 'classnames';

import './selection.scss';

export default class Selection extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            activeTab: 'home'
        };

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event)
    {
        this.setState({activeTab: event.target.name});
    }

    render ()
    {
        return(
            <div className="selection">

                <div className={`col-md-6 selection__item ${classNames({'selection__item--active': 'home' === this.state.activeTab})}`}>
                    <a name='home' onClick={this.handleClick}>Home User</a>
                </div>

                <div className={`col-md-6 selection__item ${classNames({'selection__item--active': 'schools' === this.state.activeTab})}`}>
                    <a name='schools' onClick={this.handleClick}>Schools</a>
                </div>

            </div>
        );
    }
}
