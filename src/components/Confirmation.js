import React from 'react';

export default class Confirmation extends React.Component {

    static contextTypes = {
        loggedIn     : React.PropTypes.bool.isRequired,
        user         : React.PropTypes.object.isRequired,
        handleSignOut: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="col-md-12">
                <div>
                    <h2>Thank you, your payment was successfully processed.</h2>
                </div>
                {this.context.loggedIn && <button onClick={(event) => {
                    this.context.handleSignOut(event)
                }}
                                                  className="btn">Sign Out</button>}
            </div>
        );
    }

}
