import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import requireLogin from './lib/requireLogin';

import App from './components/app';

import UserForm from './components/UserForm';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Confirmation from './components/Confirmation';
import Gift from './components/PaymentFormGift';
import Claim from './components/Claim';

render((
    <Router history={browserHistory}>
        <Route path="/"
               component={App}>
            <IndexRoute component={requireLogin(UserForm)}/>
            <Route path="/buy"
                   component={requireLogin(UserForm)}/>
            <Route path="/gift-eak"
                    component={requireLogin(Gift)}/>
            <Route path="/sign-in"
                   component={SignIn}/>
            <Route path="/sign-up"
                   component={SignUp}/>
            <Route path="/claim"
                   component={requireLogin(Claim)}/>
            <Route path="/confirmation"
                   component={requireLogin(Confirmation)}/>
        </Route>
    </Router>
), document.getElementById('app'));

Stripe.setPublishableKey(process.env.STRIPE_PUBLIC_KEY);
