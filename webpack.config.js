'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const devServer = require('./src/webpack/dev-server');
const sass = require('./src/webpack/sass');
const minify = require('./src/webpack/minify');
const freeVariables = require('./src/webpack/free-variables');
const extractBundle = require('./src/webpack/extract-bundle');
const clean = require('./src/webpack/clean');
const extractCSS = require('./src/webpack/extract-sass');


const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build', 'dist')
};

const common = {
    entry: {
        app: PATHS.app
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: require('html-webpack-template'),
            inject: false,
            appMountId: 'app',
            links: [
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
            ],
            scripts: [
                'https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,fetch',
                'https://code.jquery.com/jquery-3.1.1.min.js',
                'https://js.stripe.com/v2/'
            ]
        })
    ],
    module : {
        loaders : [
            {
                test : /\.js$/,
                exclude: /node_modules/,
                loader : 'babel'
            }
        ]
    }
};

let config;

switch(process.env.npm_lifecycle_event)
{
    case 'build':
        config = merge(
            common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js'
                }
            },
            clean(PATHS.build),
            freeVariables(
                'process.env.NODE_ENV',
                'production'
            ),
            extractBundle({
                name: 'vendor',
                entries: ['react']
            }),
            minify(),
            extractCSS(PATHS.app)
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            },
            sass(PATHS.app),
            devServer({
                host: process.env.HOST || 'localhost',
                port: process.env.PORT || 8000
            })
        );
}

module.exports = validate(config);
