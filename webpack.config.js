/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const extensions = ['.js', '.ts', '.tsx'];

module.exports = (_, argv) => {
  const isDev = argv.mode !== 'production';

  let plugins = [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html') }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          globOptions: { ignore: ['**/index.html'] },
        },
      ],
    }),
  ];

  if (isDev) {
    plugins = [
      ...plugins,
      new ESLintPlugin({ extensions, emitWarning: false }),
      new StylelintPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ];
  }

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      filename: '[contenthash].[name].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    stats: 'minimal',
    devtool: 'source-map',
    infrastructureLogging: { level: 'info' },
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      compress: false,
      historyApiFallback: true,
      static: { publicPath: '/' },
      client: { logging: 'warn' },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: { modules: { auto: true, localIdentName: '[local]_[hash:5]' } },
            },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [['autoprefixer']] } },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.svg$/,
          issuer: /\.tsx$/,
          use: [{ loader: '@svgr/webpack', options: { ref: true } }],
        },
      ],
    },
    resolve: { extensions },
    plugins,
  };
};
