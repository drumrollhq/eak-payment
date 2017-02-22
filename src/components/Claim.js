import React from 'react';
import { browserHistory } from 'react-router';

import api from '../lib/api';

import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

export default class Claim extends React.Component {

        static contextTypes = {
            loggedIn: React.PropTypes.bool.isRequired,
            user: React.PropTypes.object.isRequired,
            handleSignOut: React.PropTypes.func.isRequired
        };

        state = {
            loading: false,
            error: null,
            code: this.props.location.query.code
        };

        componentWillMount() {
            if (this.context.loggedIn && this.context.user.purchased) {
                browserHistory.push('/confirmation');
            }
        }

        handleClaim = (e) => {
            this.setState({error: null, loading: true});
            
            api
                .claimCode(this.state.code)
                .then(() => {
                    this.setState({loading: false});
                    this.handleCompleted();
                })
                .catch(e => {
                    this.setState({loading: false, error: e});
                });
        };

        handleCompleted = (e) => {
            window.location = "http://www.eraseallkittens.com/en/play/";
        }

        render() {
            const {loading, error} = this.state;
            return (
                <div className="claim-eak">
                    <h1>So you want to claim E.A.K., huh?</h1>
                    <p>The code you have entered is this: {this.state.code}</p>
                    <p>Do you want to claim this code against this account: {this.context.user.email}?</p>
                    <button onClick={(event) => {
                            this.handleClaim(event)
                        }} className="btn">Yes</button>
                    <button onClick={(event) => {
                            this.context.handleSignOut(event)
                        }} className="btn">No and sign out</button>
                </div>
            );
        }
}