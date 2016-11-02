var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier')
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

// PostCSS plugins
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

var config = {
    // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: {
    app: ['index.tsx'],
    vendors: [
      'bootstrap-sass',
      'jquery',
      'react',
      'react-dom'
    ]
  },
    // Output the bundled JS to dist/app.js
  output: {
    filename: 'app.js',
    path: path.resolve('src/main/public/js'),
    publicPath: '/assets/javascripts/',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
        // Look for modules in .ts(x) files first, then .js(x)
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
    modules: ['src/main/typescript', 'src/main/sass', 'node_modules']
  },
  module: {
    rules: [
            { enforce: 'pre', test: /\.tsx?$/, loaders: ['tslint', 'tsfmt'], exclude: /(node_modules)/ },
            // .ts(x) files should first pass through the Typescript loader, and then through babel
            { test: /\.tsx?$/, loaders: ['babel', 'awesome-typescript'], exclude: /(node_modules)/ }
    ]
  },
  plugins: [
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
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
        postcss: function () {
          return [autoprefixer, cssnano]
        },
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'main', 'sass')]
        },
        context: '/'
      }
    })
  ],
  devServer: {
    contentBase: path.resolve('src/main/public'),
        // publicPath: '/assets/',
    hot: true,
        // historyApiFallback: true,
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
      fallbackLoader: 'style',
      loader: ['css', 'postcss', 'sass', 'stylefmt?config=.stylelintrc']
    })
  })
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new ExtractTextPlugin({ filename: '../css/main.css' }))
  config.plugins.push(new StyleLintPlugin({
    context: 'src/main/sass',
    files: '**.scss',
    syntax: 'scss'
  }))
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.DedupePlugin())
} else {
  config.devtool = 'source-map'
  config.module.rules.push({ test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'] })
  config.plugins.push(new ForkCheckerPlugin())
}

module.exports = config
