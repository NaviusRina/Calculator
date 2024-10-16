const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
        main: path.resolve(__dirname, './src/index.js'),
    }, // Точка входа для сборки проекта

  output: {
        path: path.resolve(__dirname, './dist'), // Путь для выходного файла сборки
        filename: '[name].bundle.js',// Имя выходного файла сборки
    },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // Регулярное выражение для обработки файлов с расширением .css
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ], // Загрузчики, используемые для обработки CSS-файлов
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
      },
    ],
  },

  plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CleanWebpackPlugin(),
    ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  mode: 'development', // Режим сборки
};
