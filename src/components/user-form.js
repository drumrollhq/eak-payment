import React from 'react';

export default class UserForm extends React.Component
{
    render ()
    {
        return(

            <div>

                <div className="col-md-6">
                    <p>Blurb to go here.</p>
                </div>

                <div className="col-md-6">

                    <div className="alert alert-danger payment-errors hide" role="alert">
                    </div>

                    <form action="/charge" method="post" id="payment-form">

                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" className="form-control" data-stripe="number" placeholder="4242 4242 4242 4242" />
                        </div>

                        <div className="form-group">
                            <label>Expiration (MM/YY)</label>
                            <div className="input-group">
                                <input type="text" className="form-control" data-stripe="exp_month" placeholder="09" />
                                    <div className="input-group-addon">/</div>
                                    <input type="text" className="form-control" data-stripe="exp_year" placeholder="19" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>CVC</label>
                            <input type="text" className="form-control" data-stripe="cvc" placeholder="123" />
                        </div>

                        <div className="checkbox">
                            <label>Postcode</label>
                            <input type="text" className="form-control" data-stripe="address_zip" placeholder="12345" />
                        </div>

                        <button type="submit" className="btn btn-default">Submit</button>

                    </form>

                </div>

            </div>
        );
    }
}
