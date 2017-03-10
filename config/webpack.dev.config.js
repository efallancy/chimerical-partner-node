var webpack = require( "webpack" );
var path = require( "path" );

module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    path.join( __dirname, "..", "src/main.js" )
  ],
  output: {
    path: "/",
    publicPath: "http://localhost:8080",
    filename: "js/bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
