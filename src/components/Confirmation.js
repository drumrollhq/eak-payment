import React from 'react';

export default class Confirmation extends React.Component {

    static contextTypes = {
        loggedIn     : React.PropTypes.bool.isRequired,
        user         : React.PropTypes.object.isRequired,
        handleSignOut: React.PropTypes.func.isRequired
    };

    handleFacebook(event) {
        event.preventDefault();
        window.open(
            'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
            'facebook-share-dialog',
            'width=626,height=436');
    }

    handleTwitter(event) {
        event.preventDefault();
        window.open(
            'https://twitter.com/intent/tweet?text=I%E2%80%99ve%20just%20purchased%20%40EraseAllKittens%20-%20a%20game%20that%20teaches%20children%20professional%20coding%20skills!%20Join%20our%20mission%3A%20https%3A%2F%2Feraseallkittens.com%20%F0%9F%98%B8',
            'twitter-share-dialog',
            'width=626,height=436');
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="Confirmation">
                    <h2>Thanks for purchasing Erase All Kittens!</h2>

                    <p>You’ll receive updates as new levels are released :)</p>

                    <img src="/images/sprinkles-and-cake.png"/>

                    <p>
                        <a className="btn btn-primary btn-cta"
                           href="https://eraseallkittens.com/en/play"
                           target="_blank">
                            Play E.A.K
                        </a>
                    </p>

                    <p>Please help us to achieve our global mission to inspire more kids to code!</p>

                    <div className="social-buttons">
                        <a className="btn btn-facebook"
                           href="#"
                           onClick={event => this.handleFacebook(event)}>
                            <i className="fa fa-facebook-f"
                               aria-hidden="true"></i>
                        </a>
                        <a className="btn btn-twitter"
                           href="#"
                           onClick={event => this.handleTwitter(event)}>
                            <i className="fa fa-twitter"
                               aria-hidden="true"></i>
                        </a>
                        {this.context.loggedIn &&
                        <button onClick={(event) => {
                            this.context.handleSignOut(event)
                        }}
                                className="btn">Sign Out</button>}
                    </div>

                </div>
            </div>
        );
    }

}
