const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html'
});

module.exports = {
  entry: './index.tsx',
  output: {
    path: __dirname + '/www',
    publicPath: ''
  }, 
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png)$/, loader: 'file-loader' },
      { test: /\.(gif)$/, loader: 'file-loader' }
    ]
  },
  plugins: [htmlPlugin]
};
