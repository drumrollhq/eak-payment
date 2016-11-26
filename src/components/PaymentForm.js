import React from 'react';
import {browserHistory} from 'react-router';

import api from '../lib/api';

import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

export default class PaymentForm extends React.Component {

    static contextTypes = {
        loggedIn: React.PropTypes.bool.isRequired,
        user    : React.PropTypes.object.isRequired,
    };

    state = {
        loading: false,
        error  : null,
    };

    componentWillMount() {
        if (this.context.loggedIn && this.context.user.purchased) {
            browserHistory.push('/confirmation');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({error: null, loading: true});
        Stripe.card.createToken(e.target, this.handleStripeResponse);
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

    render() {
        const {loading, error} = this.state;
        return (
            <LoadingIndicator loading={loading}>
                <form onSubmit={this.handleSubmit}>
                    <ErrorMessage error={error}/>

                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text"
                               className="form-control"
                               data-stripe="number"
                               placeholder="4242 4242 4242 4242"/>
                    </div>

                    <div className="form-group">
                        <label>Expiration (MM/YY)</label>
                        <div className="input-group">
                            <input type="text"
                                   className="form-control"
                                   data-stripe="exp_month"
                                   placeholder="09"/>
                            <div className="input-group-addon">/</div>
                            <input type="text"
                                   className="form-control"
                                   data-stripe="exp_year"
                                   placeholder="19"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>CVC</label>
                        <input type="text"
                               className="form-control"
                               data-stripe="cvc"
                               placeholder="123"/>
                    </div>

                    <div className="form-group">
                        <label>
                            Country. Probably make this a dropdown or something i guess.
                            We need to collect this for tax reasons as far as i remember
                        </label>
                        <input type="text"
                               className="form-control"
                               data-stripe="address_country"
                               defaultValue="GB"/>
                    </div>

                    <div className="checkbox">
                        <label>Postcode</label>
                        <input type="text"
                               className="form-control"
                               data-stripe="address_zip"
                               placeholder="12345"/>
                    </div>

                    <button type="submit"
                            className="cta">Submit
                    </button>
                </form>
            </LoadingIndicator>
        );
    }
}
