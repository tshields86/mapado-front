const webpack = require('webpack');
const path = require('path');

const PATHS = {
  app: './app/index.js',
  html: './app/index.html',
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  entry: {
    javascript: PATHS.app,
    html: PATHS.html
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: PATHS.dist
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.(js|jsx)/,
        loaders: ["react-hot", "babel-loader"],
        include: path.join(__dirname, 'app'),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)/,
        loader: 'url?limit=100000',
      }
    ]
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.js',
      Map: 'app/components/Map.js',
      Navigation: 'app/components/Navigation.js',
      Welcome: 'app/components/Welcome.js',
      About: 'app/components/About.js',
      ViewTasks: 'app/components/ViewTasks.js',
      Task: 'app/components/Task.js',
      AddTask: 'app/components/AddTask.js',
      EditTask: 'app/components/EditTask.js',
      Form: 'app/components/Form.js',
      Marker: 'app/components/Marker.js',
      SearchBox: 'app/components/SearchBox.js',
      ajaxHelpers: 'app/utils/ajaxHelpers.js',
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './bower_components/bootstrap-sass/assets/stylesheets')
    ]
  }
};
