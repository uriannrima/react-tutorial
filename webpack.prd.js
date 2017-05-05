var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
    const path = `${__dirname}/dist/${env}`;
    return Merge(CommonConfig, {
        devtool: 'cheap-module-source-map', // Better and quicker source-map
        output: {
            path: path, // Build goes to dist/env folder.
            filename: "scripts.[chunkhash].js" // Bundle scripts and output with chunkHash.
        },
        plugins: [
            new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }), // Runs as production.
            new CleanWebpackPlugin([path]), // Clean /dist/env folder.
            new HtmlWebpackPlugin({ minify: { collapseWhitespace: true }, template: 'index.ejs' }), // Build index.html from ejs.
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[chunkhash].js' }), // Bundle vendors scripts and create vendor with chunkHash.
            new webpack.optimize.OccurrenceOrderPlugin(), // Optimize references.
            new webpack.optimize.UglifyJsPlugin({ // Make JS great again.
                minimize: true, beautify: false, comments: false, sourceMap: true,
                mangle: { screw_ie8: true, keep_fnames: true }, compress: { screw_ie8: true }
            })
        ]
    })
}