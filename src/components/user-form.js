import React from 'react';
import { browserHistory } from 'react-router';

import PaymentForm from './PaymentForm';

export default function UserForm() {
  return (
    <div>
      <div className="col-md-6 col-sm-6">
        <h2>E.A.K. for Parents</h2>
        <p>Help prepare your child for their future</p>
        <p>E.A.K. is a revolutionary way to inspire kids to code. This brand new Mario-style game introduces
            real coding languages, encouraging both girls and boys aged 8+ to become creators, rather than
            consumers of technology. You can even spend quality time playing and learning to code alongside
            your child, since E.A.K. is for beginners (and technophobes!) of any age.</p>
        <p>£4 / child / year</p>
      </div>

      <div className="col-md-6 col-sm-6">
        <PaymentForm />
      </div>
    </div>
  );
}
