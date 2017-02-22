import React from 'react';
import {browserHistory, Link} from 'react-router';

import api from '../lib/api';

import ErrorMessage from './ErrorMessage';
import LoadingIndicator from './LoadingIndicator';
import SSOButton from './SSOButton';

// Ported from https://github.com/drumrollhq/E.A.K./blob/master/app/scripts/ui/components/Login.ls

export default class SignIn extends React.Component {
    state = {
        username: '',
        password: '',
        error   : null,
        loading : false,
    };

    handleSubmit = e => {
        if (e.preventDefault) e.preventDefault();

        const {username, password} = this.state;
        this.setState({password: '', error: null, loading: true});

        api
            .login(username, password)
            .then(() => {
                this.setState({username: '', password: '', error: null, loading: false});
                this.handleComplete();
            })
            .catch(e => {
                console.error(e);
                this.setState({loading: false, error: e});
            });
    };

    handleUsernameChange = e => this.setState({username: e.target.value});
    handlePasswordChange = e => this.setState({password: e.target.value});

    handleComplete() {
        var queryString = this.props.location.query.code == null ? '' : '?code=' + this.props.location.query.code;
        browserHistory.push(this.props.location.query.returnTo + queryString);
    }

    render() {
        const {username, password, error, loading} = this.state;

        return (
            <div className="SignIn">
                <h2>Buy Now</h2>
                <p>Erase All Kittens is the first learning tool that gives children aged 8+ knowledge of professional coding languages - helping to effectively prepare them for 21st Century degrees and careers.</p>
                <p>E.A.K. currently teaches HTML syntax, and once purchased, will be updated regularly.</p>
                <LoadingIndicator loading={loading}>
                    <div className="buttons">
                        <p>No account? <Link to="/sign-up">Sign up here</Link>.</p>
                        <SSOButton provider="google"
                                   onSignIn={this.handleComplete}>Sign in with google</SSOButton>
                        <SSOButton provider="facebook"
                                   onSignIn={this.handleComplete}>Sign in with facebook</SSOButton>
                        <hr />
                    </div>
                    <form onSubmit={this.handleSubmit}>

                        <ErrorMessage error={error}/>

                        <div className="form-group">
                            <label>Username / Email</label>
                            <input type="text"
                                   value={username}
                                   onChange={this.handleUsernameChange}
                                   className="form-control"/>
                        </div>

                        <div className="form-group">
                        <label>Password</label>
                            <input type="password"
                                   value={password}
                                   onChange={this.handlePasswordChange} className="form-control"/>

                        </div>

                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </LoadingIndicator>
            </div>
        );
    }
}
