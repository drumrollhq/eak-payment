import React from 'react';
import { browserHistory } from 'react-router';

import api from '../lib/api';

import ErrorMessage from './ErrorMessage';
import LoadingIndicator from './LoadingIndicator';
import SSOButton from './SSOButton';

// Adapted from https://github.com/drumrollhq/E.A.K./blob/master/app/scripts/ui/components/SignUp.ls

export default class SignUp extends React.Component {
  state = {
    loading: false,
    error: null,
    email: '',
    password: '',
    over13: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // todo: some validation
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      assumeAdult: this.state.over13,
    };

    this.setState({ error: null, loading: true, password: '' });
    api
      .register(newUser)
      .then(() => {
        this.setState({ loading: false, error: null });
        this.handleComplete()
      })
      .catch(e => {
        console.error(e);
        this.setState({ loading: false, error: e });
      });
  };

  handleComplete() {
    browserHistory.push('/buy');
  }

  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });
  handleOver13Change = e => this.setState({ over13: e.target.value });

  render() {
    const { error, loading, email, password, over13 } = this.state;

    return (
      <div>
        <h1>Sign Up</h1>
        <h2>SSO:</h2>
        <SSOButton provider="google" onSignIn={this.handleComplete}>Sign Up with Google</SSOButton>
        <SSOButton provider="facebook" onSignIn={this.handleComplete}>Sign Up with Facebook</SSOButton>

        <hr />

        <LoadingIndicator loading={loading}>
          <form onSubmit={this.handleSubmit}>
            <ErrorMessage error={error} />

            <label>
              Email / parents email
              <input type="text" onChange={this.handleEmailChange} value={email} />
            </label>

            <label>
              Password
              <input type="password" onChange={this.handlePasswordChange} value={password} />
            </label>

            <div>
              Over 13?
              <label>
                <input type="radio" checked={over13 === 'true'} value="true" onChange={this.handleOver13Change} />
                Yep
              </label>
              <label>
                <input type="radio" checked={over13 === 'false'} value="false" onChange={this.handleOver13Change} />
                Nope
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </LoadingIndicator>
      </div>
    );
  }
}
