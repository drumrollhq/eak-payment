import React from 'react';
import { browserHistory } from 'react-router';

const handleClick = e => {
  e.preventDefault();
  browserHistory.push(e.target.href);
};

export default function Link(props) {
  return <a {...props} onClick={handleClick} />;
}
