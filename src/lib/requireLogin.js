import React from 'react';

import { browserHistory } from 'react-router';

export default (Component) => class extends React.Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.checkLoggedIn(this.context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.checkLoggedIn(nextContext);
  }

  checkLoggedIn(context) {
    if (!context.loggedIn) browserHistory.push('/sign-in');
  }

  render() {
    return <Component {...this.props} />;
  }
};
