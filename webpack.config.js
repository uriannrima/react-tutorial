const debug = process.argv.indexOf('-p') === -1;
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"), // Context where the command will execute.
  devtool: debug ? "inline-sourcemap" : 'cheap-module-source-map',
  entry: {
    app: ["./client.js"],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'flux',
      'history',
      'mobx',
      'mobx-react'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/, // This loader will be used to process Typescript and TSX.
        loaders: ['babel-loader', 'ts-loader'], // TS-Loader convert TS(ES6) to JS(ES6), then Babel parse from JSES6 to JSES5.
        exclude: /(node_modules|bower_components)/ // Don't do it to modules or components.
      },
      {
        test: /\.jsx?$/, // Everything that is js(or jsx, the X is optional since there is a ?) will be processed by this loader, which...
        exclude: /(node_modules|bower_components)/, // Excludes anything inside node_modules and bower_components
        loader: 'babel', // Everything that this loader process will be processed by the babel
      }
    ]
  },
  output: {
    path: debug ? __dirname + "/src/" : __dirname + "/dist/", // Where the transpiled client.js will be outputed
    filename: "client.min.js" // Where exactly as file, this one should be the one to be inserted in our index.html, since it's "compiled" already.
  },
  plugins: debug ?
    [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ] :
    [
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ],
  resolve: {
    'root': [path.resolve('./src')],
    'extensions': ['', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      utils: path.resolve('./src/utils/'),
      dispatcher: path.resolve('./src/dispatcher/'),
    }
  }
};
