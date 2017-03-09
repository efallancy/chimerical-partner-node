var path = require( "path" );
var webpack = require( "webpack" );

// Plugins as of production only include UglifyJS
module.exports = {
  entry: path.join( __dirname, "..", "src/main.js" ),
  output: {
    path: path.join( __dirname, "..", "public" ),
    filename: "js/bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin( {
      "process.env": {
        "NODE_ENV": JSON.stringify( "production" )
      }
    } ),
    new webpack.optimize.UglifyJsPlugin( {
      beautify: false,
      comments: false,
      extractComments: false,
      compress: {
        warnings: false
      },
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }
    })
  ]
};
