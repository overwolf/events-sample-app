/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin');
// OverwolfPlugin = require('./overwolf.webpack');

module.exports = (env) => ({
  entry: {
    index: './src/windows/index.ts',
    'in-game': './src/windows/in-game.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    clean: true,
    filename: 'windows/[name]/controller.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, 'public/'),
          from: './',
          to: './',
          globOptions: { ignore: ['**/*.html'] },
        },
        { from: 'plugins', to: 'plugins' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/windows/in-game.html',
      filename: path.resolve(__dirname, './dist/windows/in-game/page.html'),
      chunks: ['in-game'],
    }),
    new HtmlWebpackPlugin({
      template: './public/windows/index.html',
      filename: path.resolve(__dirname, './dist/windows/index/page.html'),
      chunks: ['index'],
    }),
  ],
});
