// path — встроенный в Node.js модуль
const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  // Указываем путь до входной точки:
  entry: './src/main.js',
  // Описываем, куда следует поместить результат работы:
  output: {
    // Путь до директории (важно использовать path.resolve):
    path: path.resolve(__dirname, 'build'),
    // Имя файла со сборкой:
    filename: 'bundle.[contenthash].js',
    clean: true,
    },
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin({
      template: "public/index.html",
    }),

    new CopyPlugin({
      patterns: [{ from: 'public', globOptions: {
        ignore: ["**/index.html"],
        },
      }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
