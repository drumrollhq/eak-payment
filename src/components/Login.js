import React from 'react';
import api from '../lib/api';

import LoadingIndicator from './LoadingIndicator';
import SSOButton from './SSOButton';
import ErrorMessage from './ErrorMessage';

// Ported from https://github.com/drumrollhq/E.A.K./blob/master/app/scripts/ui/components/Login.ls

export default class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
    loading: false,
  };

  handleSubmit = e => {
    if (e.preventDefault) e.preventDefault();

    const { username, password } = this.state;
    this.setState({ password: '', error: null, loading: true });

    api
      .login(username, password)
      .then(() => {
        this.setState({ username: '', password: '', error: null, loading: false });
      })
      .catch(e => {
        console.error(e);
        this.setState({ loading: false, error: e });
      });
  }

  handleUsernameChange = e => this.setState({ username: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });

  handleSSO = data => {
    console.log(data);
  }

  render() {
    const { username, password, error, loading } = this.state;

    return (
      <div className="login">
        <LoadingIndicator loading={loading}>
          <p>No account? <a href="/sign-up">Sign up here</a>.</p>
          <SSOButton provider="google" onSignIn={this.handleSSO}>Sign in with google</SSOButton>
          <SSOButton provider="facebook" onSignIn={this.handleSSO}>Sign in with facebook</SSOButton>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <ErrorMessage error={error} />
            <label>
              Username / email
              <input type="text" value={username} onChange={this.handleUsernameChange} />
            </label>

            <label>
              Password
              <input type="password" value={password} onChange={this.handlePasswordChange} />
            </label>

            <button type="submit">Sign In</button>
          </form>
        </LoadingIndicator>
      </div>
    );
  }
}
