import React from 'react';

import api from '../lib/api';
import LoadingIndicator from './LoadingIndicator';

export default class App extends React.Component {

    static childContextTypes = {
        user    : React.PropTypes.object,
        loggedIn: React.PropTypes.bool,
        handleSignOut: React.PropTypes.func
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

        const {user, loggedIn} = this.state.user;

        return {
            user,
            loggedIn,
            handleSignOut: this.handleSignOut

        };
    }

    componentWillUnmount() {
        api.removeEventListener('user', this.handleNewUser);
    }

    handleNewUser = user => this.setState({user, ready: true});

    handleSignOut = (event) => {
        event.preventDefault();
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
            </div>
        );
    }
}
