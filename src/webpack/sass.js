module.exports = function(paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ['style?sourceMap', 'css?sourceMap', 'sass?sourceMap'],
                    include: paths
                }
            ]
        }
    };
};
