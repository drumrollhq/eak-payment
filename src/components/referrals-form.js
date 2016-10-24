import React from 'react';

export default class ReferralsForm extends React.Component
{
    render ()
    {
        return(

            <div>

                <div className="col-md-6">
                    <p>Referal blurb to go here.</p>
                </div>

                <div className="col-md-6">

                    <div className="alert alert-danger payment-errors hide" role="alert">
                    </div>

                    <form>

                        <div className="form-group">
                            <input type="email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control" />
                        </div>

                        <button type="submit" className="btn btn-default">Submit</button>

                    </form>

                </div>

            </div>
        );
    }
}
