import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import requireLogin from './lib/requireLogin';

import App from './components/app';
import UserForm from './components/user-form';
import RegisterForm from './components/register-form';
import OptionsForm from './components/options-form';
import ReferralsForm from './components/referrals-form';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={RegisterForm} />
            <Route path="/buy" component={requireLogin(UserForm)}/>
            <Route path="/options" component={OptionsForm}/>
            <Route path="/referrals" component={ReferralsForm}/>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
        </Route>
    </Router>
), document.getElementById('app'));

Stripe.setPublishableKey('pk_test_e3mLdEPNTPqXmMSNi2DkOKBA');
