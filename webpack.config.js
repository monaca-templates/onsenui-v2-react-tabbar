const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const path = require("path");
const mode = require('yargs').argv.mode;
const devMode = mode !== 'production';


let host = '0.0.0.0'; //@todo
let port = '8086'; //@todo
let protocol = 'http'; //@todo
let publicPath = '/'; //@todo

let webpackConfig = {
  entry: {
    app: ['./src/main.jsx']
  },

  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },

  optimization: {
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
    removeEmptyChunks: true,
    providedExports: true
  },
  
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.html', '.styl'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ 'react', 'env' ],
            plugins: devMode ? ['react-hot-loader/babel'] : []
          } 
        }]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?\S*)?$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: [          
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  
  // See below for dev plugin management.
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/public/index.html.ejs',
      chunksSortMode: 'dependency'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),
    new ProgressBarPlugin(),
  ],
 
  resolveLoader: {
    modules: [ 'node_modules' ]
  },
 
  performance: {
    hints: false
  }
};

/*
* Dev
*/
if(devMode) {

  // webpack-serve
  webpackConfig.mode = 'development'; //@todo
  webpackConfig.serve = {
    port: port,
    host: host,
    dev: {
      publicPath: publicPath,
      stats: {
        colors: true,
        errorDetails: true,
        performance: true,
        source: true,
        warnings: true,
        builtAt: true,
      }
    },
    hot: true
  }

  // webpack-dev-server
  // webpackConfig.devtool = 'inline-source-map';
  // webpackConfig.cache = true;
  // webpackConfig.resolve.unsafeCache = true;
  // webpackConfig.output.publicPath = '/';
  
  // webpackConfig.devServer = {
  //   contentBase: './src/public',
  //   host: host,
  //   stats: {
  //     colors: true
  //   },
  //   historyApiFallback: true,
  //   inline: true,
  //   hot: true,
  //   port: port
  // };

  // webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');
  // webpackConfig.entry.app.unshift(`webpack-dev-server/client?${protocol}://${host}:${port}`);
  // webpackConfig.entry.app.unshift('react-hot-loader/patch');

  // let devPlugins = [
    // new webpack.HotModuleReplacementPlugin(),
  //   // new webpack.LoaderOptionsPlugin({ debug: true }),
  // ];
  
  // webpackConfig.plugins = webpackConfig.plugins.concat( devPlugins　);
}

module.exports = webpackConfig;
