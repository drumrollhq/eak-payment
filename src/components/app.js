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

                    <div className="jumbotron">
                        <h1>EAK - Payment Demo</h1>
                    </div>

                    {'/referrals' !== this.props.location.pathname ? <Selection /> : null}

                    {this.props.children}

                    <footer className="col-md-12">
                        <Link to="/referrals" activeClassName="active">Referrals</Link>
                    </footer>

                </div>

            </div>
        );
    }
}
