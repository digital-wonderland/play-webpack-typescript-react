'use strict'

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')
var TypedocWebpackPlugin = require('typedoc-webpack-plugin')

var config = {
  // This will be our app's entry point (webpack will look for it in the 'src/main/typescript' directory due to the resolve.modules setting below). Feel free to change as desired.
  entry: {
    app: ['index.tsx'],
    vendors: [
      'bootstrap-sass',
      'jquery',
      'react',
      'react-dom'
    ]
  },
  // Output the bundled JS to target/web/webpack/js/app.js
  output: {
    filename: 'app.js',
    path: path.resolve('target', 'web', 'webpack', 'js'),
    publicPath: '/assets/js/',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
    // Look for modules in .ts(x) files first, then .js(x)
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // Add 'src/main/typescript' and 'src/main/sass', as all our app code will live in there, so Webpack should look in there for modules
    modules: [path.join('src', 'main', 'typescript'), path.join('src', 'main', 'sass'), 'node_modules']
  },
  resolveLoader: {
    modules: ['node_modules', 'web_loaders']
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.tsx?$/, loaders: ['tslint-loader', 'tsfmt-loader'], exclude: /(node_modules)/ },
      // .ts(x) files should first pass through the awesome-typescript loader and then through babel
      { test: /\.tsx?$/, loaders: ['babel-loader', 'awesome-typescript-loader'], exclude: /(node_modules)/ }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: false }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.js' }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        },
        sassLoader: {
          includePaths: [path.resolve('src', 'main', 'sass')]
        },
        context: '/'
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    stats: { colors: true },
    proxy: {
      '*': 'http://localhost:9000'
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  config.module.rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader', 'postcss-loader', 'sass-loader', 'stylefmt-loader?config=.stylelintrc']
    })
  })
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new ExtractTextPlugin({ filename: path.join('..', 'css', 'main.css') }))
  config.plugins.push(new StyleLintPlugin({
    context: path.join('src', 'main', 'sass'),
    files: '**.scss',
    syntax: 'scss'
  }))
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new TypedocWebpackPlugin({
    jsx: 'preserve',
    mode: 'file',
    out: path.join('..', '..', '..', 'typedoc'),
    target: 'es6'
  }, ['./src/main/typescript']))
} else {
  config.devtool = 'source-map'
  config.module.rules.push({ test: /\.scss$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap', 'stylefmt-loader?config=.stylelintrc'] })
  config.plugins.push(new webpack.NamedModulesPlugin())
  config.entry.app.unshift('react-hot-loader/patch')
  config.plugins.push(new BrowserSyncPlugin({
    host: '0.0.0.0',
    port: 3000,
    proxy: 'http://localhost:2992'
  }, {
    reload: false
  }))
  config.plugins.push(new DashboardPlugin({ port: 3002 }))
}

module.exports = config
