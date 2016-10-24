import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './components/app';
import UserForm from './components/user-form';
import SchoolsForm from './components/schools-form';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={UserForm} />
            <Route path="/schools" component={SchoolsForm}/>
        </Route>
    </Router>
), document.getElementById('app'));

function stripeResponseHandler(status, response) {
    // Grab the form:
    var $form = $('#payment-form');

    if (response.error) { // Problem!

        // Show the errors on the form:
        $('.payment-errors').html(response.error.message).removeClass('hide');
        $form.find('.submit').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.id;

        // Insert the token ID into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken">').val(token));

        // Submit the form:
        $form.get(0).submit();
    }
};

Stripe.setPublishableKey('pk_test_cA7dgir7RDXeSfI1ehdPDRxy');

$(function() {
    var $form = $('#payment-form');
    $form.submit(function(event) {
        // Disable the submit button to prevent repeated clicks:
        $form.find('.submit').prop('disabled', true);

        // Request a token from Stripe:
        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from being submitted:
        return false;
    });
});
