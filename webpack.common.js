var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"), // Context where the command will execute.
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
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'], // Allow us to import and automatically use files without extension (like Feat, Feat.js, Feat.ts, etc)
    modules: [path.resolve(__dirname, "./src"), "node_modules"], // Find modules first on our ./src, then try to find on node_modules
    alias: {
      utils: path.resolve('./src/utils/'), // Make reference to utils easier
      dispatcher: path.resolve('./src/dispatcher/'), // Make reference to dispatcher easier
    }
  }
};