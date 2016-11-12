import React from 'react';

import './app.scss';

import api from '../lib/api';
import LoadingIndicator from './LoadingIndicator';

export default class App extends React.Component {
  static childContextTypes = {
    user: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  }

  state = {
    user: {},
    ready: false,
  }

  componentDidMount() {
    api
      .currentUser()
      .then(this.handleNewUser);

    api.on('user', this.handleNewUser);
  }

  componentWillUnmount() {
    api.removeEventListener('user', this.handleNewUser);
  }

  handleNewUser = user => this.setState({ user, ready: true });

  getChildContext() {
    const { user = null, loggedIn = false } = this.state.user;
    return { user, loggedIn };
  }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                  <LoadingIndicator loading={!this.state.ready}>
                    {this.props.children}
                  </LoadingIndicator>
                </div>

                <div className="row">
                  <h4>Current user:</h4>
                  <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
                </div>
            </div>
        );
    }
}
