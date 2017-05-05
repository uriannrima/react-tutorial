const debug = process.argv.indexOf('-p') === -1;
var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devTool = debug ? "inline-sourcemap" : 'cheap-module-source-map';
const outputPath = debug ? __dirname + "/src/" : __dirname + "/dist/";

module.exports = {
  context: path.join(__dirname, "src"), // Context where the command will execute.
  devtool: devTool,
  entry: {
    app: ["./script.js"],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'flux',
      'history',
      'mobx',
      'mobx-react'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // This loader will be used to process Typescript and TSX.
        use: ['babel-loader', 'ts-loader'], // TS-Loader convert TS(ES6) to JS(ES6), then Babel parse from JSES6 to JSES5.
        exclude: /(node_modules|bower_components)/ // Don't do it to modules or components.
      },
      {
        test: /\.jsx?$/, // Everything that is js(or jsx, the X is optional since there is a ?) will be processed by this loader, which...
        exclude: /(node_modules|bower_components)/, // Excludes anything inside node_modules and bower_components
        use: ['babel-loader'], // Everything that this loader process will be processed by the babel
      }
    ]
  },
  output: {
    path: outputPath, // Where the transpiled client.js will be outputed
    filename: "scripts.min.js" // Where exactly as file, this one should be the one to be inserted in our index.html, since it's "compiled" already.
  },
  plugins: debug ?
    [
      new HtmlWebpackPlugin({ template: 'index.ejs', alwaysWriteToDisk: true }), // Build index.html from index.ejs
      new HtmlWebpackHarddiskPlugin({ outputPath: path.resolve(__dirname, './src') }), // Write it to ./src
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ] :
    [
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
      new CleanWebpackPlugin(['dist']),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
      new HtmlWebpackPlugin({ minify: { collapseWhitespace: true }, template: 'index.ejs' }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false, comments: false, sourceMap: true,
        mangle: { screw_ie8: true, keep_fnames: true },
        compress: { screw_ie8: true }
      })
    ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'], // Allow us to import and automatically use files without extension (like Feat, Feat.js, Feat.ts, etc)
    modules: [path.resolve(__dirname, "./src"), "node_modules"], // Find modules first on our ./src, then try to find on node_modules
    alias: {
      utils: path.resolve('./src/utils/'), // Make reference to utils easier
      dispatcher: path.resolve('./src/dispatcher/'), // Make reference to dispatcher easier
    }
  }
};
