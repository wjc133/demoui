const webpack = require('webpack');
const path = require('path');
const distPath = path.resolve(__dirname, 'dist');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [path.join(__dirname, '/src/App.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: distPath, // Path of output file
    filename: 'App.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Transfer Files
    new TransferWebpackPlugin([
      {from: 'static'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;
