const webpack = require('webpack');

module.exports = {
    entry: "./src/Router.jsx",
    output: {
        filename: "../public/bundle.js"
    },
    resolve: {
    	exceptions:['','.css','.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader','stylus-loader']
            },
            { test: /\.css$/, loaders: ['style-loader','css-loader'] },
			{ test: /\.less$/, loader: 'less'}
        ]
    }
}
