var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = function (env) {
    const path = `${__dirname}/src`;
    return Merge(CommonConfig, {
        devtool: 'inline-sourcemap', // Dev Source Maps.
        output: {
            path: path, // Build to src folder.
            filename: "scripts.js" // Keep file name.
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }), // Bundle vendors script.
            new HtmlWebpackPlugin({ template: 'index.ejs', alwaysWriteToDisk: true }), // Build index.html from index.ejs
            new HtmlWebpackHarddiskPlugin({ outputPath: path }), // Write it to ./src
        ]
    })
}