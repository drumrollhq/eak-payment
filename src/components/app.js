import React from 'react';

import Form from './user-form';
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

                    <Form />

                </div>

            </div>
        );
    }
}
