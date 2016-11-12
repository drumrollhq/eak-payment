import React from 'react';

const errorMessage = e =>
  e.details || e.message || e.statusText || e;

export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">Error</div>
      <div className="panel-body">{errorMessage(error)}</div>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: React.PropTypes.object,
};
