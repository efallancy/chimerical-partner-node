var webpack = require( "webpack" );
var path = require( "path" );
var ExtractTextPlugin = require( "extract-text-webpack-plugin" );

var config = {
  entry: __dirname + "/src/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve( __dirname, "src" ),
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        include: path.resolve( __dirname, "src" ),
        use: ExtractTextPlugin.extract( {
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin( "css/style.css" )
  ]
};

module.exports = config;
