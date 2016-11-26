import React from 'react';

import './app.scss';

import api from '../lib/api';
import LoadingIndicator from './LoadingIndicator';

export default class App extends React.Component {

    static childContextTypes = {
        user    : React.PropTypes.object,
        loggedIn: React.PropTypes.bool,
    };

    state = {
        user : {
            loggedIn: false,
            user    : null,
        },
        ready: false,
    };

    componentDidMount() {
        api
            .currentUser()
            .then(this.handleNewUser);

        api.on('user', this.handleNewUser);
    }

    getChildContext() {
        const {user = null, loggedIn = false} = this.state.user;
        return {user, loggedIn};
    }

    componentWillUnmount() {
        api.removeEventListener('user', this.handleNewUser);
    }

    handleNewUser = user => this.setState({user, ready: true});

    handleSignOut = () => {
        api.logout();
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <LoadingIndicator loading={!this.state.ready}>
                        {this.props.children}
                    </LoadingIndicator>
                </div>

                <div className="row">
                    <h4>Current user</h4>
                    {this.state.user.loggedIn && <button onClick={this.handleSignOut}>Sign Out</button>}
                </div>
            </div>
        );
    }
}
