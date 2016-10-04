'use strict';

const hapi = require('hapi');
const inert = require('inert');
const good = require('good');

const server = new hapi.Server();
server.connection({port: process.env.PORT || 5000});
server.register(inert);
server.register({
    register: good,
    options: {
        reporters: {
            console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                },
                {
                    module: 'good-console'
                },
                'stdout'
            ]
        }
    }
});

// Add the route
server.route({
    method: 'GET',
    path:'/{param*}',
    handler: {
        directory: {
            path: 'public',
            index: true
        }
    }
});

server.route({
    method: 'POST',
    path:'/charge',
    handler: function (request, reply) {

        // Set your secret key: remember to change this to your live secret key in production
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        var stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

        // Get the credit card details submitted by the form
        var token = request.payload.stripeToken; // Using Express

        // // Create a charge: this will charge the user's card
        var charge = stripe.charges.create({
            amount: 100, // Amount in cents
            currency: "gbp",
            source: token,
            description: "Example charge"
        }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
                // The card has been declined
            }
        });

        return reply.file('./views/confirmation.html');

    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }

    server.log('info', `Server running at: ${server.info.uri}`);

});
