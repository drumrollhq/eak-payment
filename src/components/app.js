import React from 'react';
import {Link} from 'react-router'

import Selection from './selection';
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
