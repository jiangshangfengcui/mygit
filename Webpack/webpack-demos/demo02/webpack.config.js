var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require('webpack');


module.exports = {
  entry: {main: './main1.js'}, 
  output: {
    path:__dirname + '/public', 
    filename: 'js/[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: [ '.js', '.css']
  },
  module: {
    loaders: [
      {test: /\.html$/, loader:'html-loader'},
      // {test: /\.js$/, loader: 'babel'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})},
      {test: /\.(jpg|png)$/, loader: 'url?limit=8192'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'html/index.html',
      template: './index.html',
      inject: true,
      chunks: ['main'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      hash: true,
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    })
  ]
}
