const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const devServer = require('./src/webpack/dev-server');


const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build', 'dist')
};

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
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
        config = merge(common, {});
        break;
    default:
        config = merge(
            common,
            devServer({
                host: process.env.HOST || 'localhost',
                port: process.env.PORT || 8000
            })
        );
}

module.exports = validate(config);
