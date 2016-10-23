import React from 'react';

import Form from './form';
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

                    <Form />

                </div>

            </div>
        );
    }
}
