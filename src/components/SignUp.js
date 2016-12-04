import React from 'react';
import {browserHistory} from 'react-router';

import api from '../lib/api';

import ErrorMessage from './ErrorMessage';
import LoadingIndicator from './LoadingIndicator';
import SSOButton from './SSOButton';

// Adapted from https://github.com/drumrollhq/E.A.K./blob/master/app/scripts/ui/components/SignUp.ls

export default class SignUp extends React.Component {
    state = {
        loading : false,
        error   : null,
        email   : '',
        password: '',
        over13  : false,
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // todo: some validation
        const newUser = {
            email      : this.state.email,
            password   : this.state.password,
            assumeAdult: this.state.over13,
        };

        this.setState({error: null, loading: true, password: ''});
        api
            .register(newUser)
            .then(() => {
                this.setState({loading: false, error: null});
                this.handleComplete()
            })
            .catch(e => {
                console.error(e);
                this.setState({loading: false, error: e});
            });
    };

    handleComplete() {
        browserHistory.push('/buy');
    }

    handleEmailChange    = e => this.setState({email: e.target.value});
    handlePasswordChange = e => this.setState({password: e.target.value});
    handleOver13Change   = e => {
        this.setState({over13: !this.state.over13})
    };

    handleBackButton = (event) => {
        event.preventDefault();
        browserHistory.push('/');
    };

    render() {
        const {error, loading, email, password, over13} = this.state;

        return (
            <div className="SignUp">
                <h2>Sign Up</h2>

                <SSOButton provider="google"
                           onSignIn={this.handleComplete}>Sign Up with Google</SSOButton>
                <SSOButton provider="facebook"
                           onSignIn={this.handleComplete}>Sign Up with Facebook</SSOButton>

                <LoadingIndicator loading={loading}>
                    <form onSubmit={this.handleSubmit}>

                        <ErrorMessage error={error}/>

                        <div className="form-group">
                            <label>Email</label>
                                <input type="text"
                                       onChange={this.handleEmailChange}
                                       value={email}
                                       className="form-control"/>

                        </div>

                        <div className="form-group">
                            <label>
                                Password
                            </label>
                                <input type="password"
                                       onChange={this.handlePasswordChange}
                                       value={password}
                                       className="form-control"/>

                        </div>

                        <div className="checkbox">
                            <label>
                                <input type="checkbox"
                                       value={this.state.over13}
                                       checked={over13 === true}
                                       onChange={this.handleOver13Change}/> Check this box if you are 13 or older
                            </label>
                        </div>


                        <button type="submit"
                                className="btn btn-primary">Register
                        </button>

                        <button className="btn"
                                onClick={(event) => {
                                    this.handleBackButton(event)
                                }}>Cancel
                        </button>
                    </form>
                </LoadingIndicator>
            </div>
        );
    }
}
