const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function(paths) {
    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
                    include: paths
                }
            ]
        },
        plugins: [
            // Output extracted CSS to a file
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    };
};
