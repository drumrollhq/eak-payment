import React from 'react';

import {browserHistory} from 'react-router';

export default (Component) => class extends React.Component {

    static contextTypes = {
        loggedIn: React.PropTypes.bool.isRequired,
        user    : React.PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.checkLoggedIn(this.context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkLoggedIn(nextContext);
    }

    checkLoggedIn(context) {
        if (!context.loggedIn) {
            var queryString = this.props.location.query.code == null ? '' : '&code=' + this.props.location.query.code
            browserHistory.push('/sign-in?returnTo=' + this.props.location.pathname + queryString);
        }
    }

    render() {
        return <Component {...this.props} />;
    }
};
