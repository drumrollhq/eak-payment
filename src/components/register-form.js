import React from 'react';
import { browserHistory } from 'react-router';

class RegisterForm extends React.Component
{
    handleFormSubmit(event) {
        event.preventDefault();
        browserHistory.push('/options');
    };

    render ()
    {
        return(

            <div>

                <div className="col-md-6 col-sm-6">
                    <h2>Benefits</h2>
                    <ul>
                        <li>Benefit 1</li>
                        <li>Benefit 2</li>
                        <li>Benefit 3</li>
                        <li>Benefit 4</li>
                    </ul>
                </div>

                <div className="col-md-6 col-sm-6">

                    <div className="alert alert-danger payment-errors hide" role="alert">
                    </div>

                    <form>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control"/>
                        </div>

                        <button type="submit" className="cta" onClick={this.handleFormSubmit}>Submit</button>

                    </form>

                </div>

            </div>
        );
    }
}

export default RegisterForm;
