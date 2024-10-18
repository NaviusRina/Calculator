const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const postcssPresetEnv = require('postcss-preset-env');

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
        test: /\.(sa|sc|c)ss$/, // Регулярное выражение для обработки файлов с расширением .css
        // use: [
          // Creates `style` nodes from JS strings
          // "style-loader",
          // Translates CSS into CommonJS
          // "css-loader",
          // Compiles Sass to CSS
          // "sass-loader",
        // ], // Загрузчики, используемые для обработки CSS-файлов
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "style-loader",
        //   "css-loader",
        //   "sass-loader",
        // ],
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
            inject: 'body', //перенос в боди файла
            filename: 'index.html', // название выходного файла
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          // filename: './[name].css',
          // chunkFilename: './[name].css',
        }),
    ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  mode: 'development', // Режим сборки
};
