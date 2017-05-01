var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"), // Context where the command will execute.
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js", // Entry point of our aplication
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // Everything that is js(or jsx, the X is optional since there is a ?) will be processed by this loader, which...
        exclude: /(node_modules|bower_components)/, // Excludes anything inside node_modules and bower_components
        loader: 'babel-loader', // Everything that this loader process will be processed by the babel-loader, wich suports...
        query: {
          presets: ['react', 'es2015', 'stage-0'], // React, ES2015 (IE 8) and some beta stuff
          // React HTML Attrs allow you to use keyword "class" inside the JSX, otherwhise you would have to use className.
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'], // Some stuff from ES6 and Decorators.
        }
      }
    ]
  },
  output: {
    path: __dirname + "/src/", // Where the transpiled client.js will be outputed
    filename: "client.min.js" // Where exactly as file, this one should be the one to be inserted in our index.html, since it's "compiled" already.
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
