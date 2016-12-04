import React from 'react';
import api from '../lib/api';

// Adapted from https://github.com/drumrollhq/E.A.K./blob/master/app/scripts/ui/utils/SSOMixin.ls

export default class SSOButton extends React.Component {
  static propTypes = {
    provider: React.PropTypes.oneOf(['facebook', 'google']).isRequired,
    children: React.PropTypes.node.isRequired,
    onSignIn: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (e) => {
    if (e.source === this.ssoWindow) this.handleCallback(e.data);
  }

  handleCallback(data) {
    this.ssoWindow.close();
    this.ssoWindow = null;

    window.focus();
    api.ssoCallback(data);
    this.props.onSignIn(data);
  }

  handleClick = (e) => {
    const { provider } = this.props;

    if (!this.ssoWindow || this.ssoWindow.closed) {
      this.ssoWindow = window.open(`${api.root}/v1/auth/${provider}/?redirect=/v1/auth/js-return`);
    } else if (this.ssoWindow) {
      this.ssoWindow.focus();
    }
  };

  render() {
    const { provider, children } = this.props;
    return (
      <button className={`btn btn-lg btn-block btn-${provider}`} onClick={this.handleClick}>
        {children}
      </button>
    );
  }
}
