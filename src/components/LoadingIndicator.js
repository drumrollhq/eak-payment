import React from 'react';

export default function LoadingIndicator({ loading, children }) {
  const content = loading
    ? <h3>Loading...</h3>
    : children;

  return (
    <div className={`loading-indicator ${loading ? 'loading-indicator-loading' : ''}`}>
      {content}
    </div>
  );
}

LoadingIndicator.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired,
};
