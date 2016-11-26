import React from 'react';

import PaymentForm from './PaymentForm';

export default class SSOButton extends React.Component {

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <PaymentForm />
                </div>
            </div>
        );
    }
}
