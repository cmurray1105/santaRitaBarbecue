const path = require('path');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  entry: [`${SRC_DIR}/index.js`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

        ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
