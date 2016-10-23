import React from 'react';

import Selection from './selection';
import './app.scss';

export default class App extends React.Component
{
    render () {
        return (
            <div className="container-fluid">

                <div className="row">

                    <div className="jumbotron">
                        <h1>EAK - Payment Demo</h1>
                    </div>

                    <Selection />

                    {this.props.children}

                </div>

            </div>
        );
    }
}
