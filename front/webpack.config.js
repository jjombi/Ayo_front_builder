const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist') 
  },
  devtool: 'eval-cheap-source-map',
//// 아까 설치한 loader를 설정해줌
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jfif$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
        ],
      },
      {
        test : /\.(png|jpg)$/,
        use : [
          'file-loader'
        ]
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.EnvironmentPlugin( { ...process.env } ), // 빼두 될지고
    new dotenv(),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(dotenv.parsed),
    //   'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    // }),
  ]
  
};