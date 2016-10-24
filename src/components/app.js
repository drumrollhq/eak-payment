import React from 'react';

import './app.scss';

export default class App extends React.Component
{
    render () {
        return (
            <div className="container-fluid">

                <div className="row">

                    {this.props.children}

                </div>

            </div>
        );
    }
}
