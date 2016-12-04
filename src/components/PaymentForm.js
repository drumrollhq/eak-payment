import React from 'react';
import {browserHistory} from 'react-router';

import api from '../lib/api';

import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

export default class PaymentForm extends React.Component {

    static contextTypes = {
        loggedIn     : React.PropTypes.bool.isRequired,
        user         : React.PropTypes.object.isRequired,
        handleSignOut: React.PropTypes.func.isRequired
    };

    state = {
        loading   : false,
        error     : null,
        cardNumber: '',
        expMonth  : '',
        expYear   : '',
        cvc       : '',
        postcode  : ''
    };

    componentWillMount() {
        console.log(this.context);
        if (this.context.loggedIn && this.context.user.purchased) {
            browserHistory.push('/confirmation');
        }
    }

    handleSubmit = (e) => {

        e.preventDefault();

        this.setState({error: null, loading: true});
        Stripe.card.createToken({
            number: this.state.cardNumber,
            cvc: this.state.cvc,
            exp_month: this.state.expMonth,
            exp_year: this.state.expYear,
            address_zip: this.state.postcode,
            address_country: 'GB'
        }, this.handleStripeResponse);
    };

    handleStripeResponse = (status, response) => {
        if (response.error) {
            this.setState({loading: false, error: response.error});
        } else {
            const payload = {
                type       : 'parent',
                token      : response.id,
                ip         : response.client_ip,
                userCountry: response.card.address_country,
                cardCountry: response.card.country,
            };

            api
                .buy(payload)
                .then(() => {
                    this.setState({loading: false});
                    this.handleCompleted();
                })
                .catch(e => {
                    this.setState({loading: false, error: e});
                });
        }
    };

    handleCompleted() {
        browserHistory.push('/confirmation');
    }

    handleCardNumber = (event) => {
        this.setState({cardNumber: event.target.value});
    };

    handleExpMonth = (event) => {
        this.setState({expMonth: event.target.value});
    };

    handleExpYear = (event) => {
        this.setState({expYear: event.target.value});
    };

    handleCvc = (event) => {
        this.setState({cvc: event.target.value});
    };

    handlePostcode = (event) => {
        this.setState({postcode: event.target.value});
    };

    render() {
        const {loading, error} = this.state;
        return (
            <div className="PaymentForm">
                <h2>Payment details</h2>
                <LoadingIndicator loading={loading}>
                    <form onSubmit={this.handleSubmit}>

                        <ErrorMessage error={error}/>

                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.cardNumber}
                                   onChange={this.handleCardNumber}/>
                        </div>

                        <div className="form-group">
                            <label>Expiration (MM/YY)</label>
                            <div className="input-group">
                                <input type="text"
                                       className="form-control"
                                       value={this.state.expMonth}
                                       onChange={this.handleExpMonth}/>
                                <div className="input-group-addon">/</div>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.expYear}
                                       onChange={this.handleExpYear}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>CVC</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.cvc}
                                   onChange={this.handleCvc}/>
                        </div>

                        <div className="form-group">
                            <label>Postcode</label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.postcode}
                                   onChange={this.handlePostcode}/>
                        </div>

                        {this.context.loggedIn && <button onClick={(event) => {
                            this.context.handleSignOut(event)
                        }}
                                                          className="btn">Sign Out</button>}
                        <button type="submit"
                                className="btn btn-primary">Buy Now
                        </button>
                    </form>
                </LoadingIndicator>
            </div>
        );
    }
}
