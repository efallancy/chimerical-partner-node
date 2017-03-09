var webpack = require( "webpack" );
var path = require( "path" );
var ExtractTextPlugin = require( "extract-text-webpack-plugin" );
var config = ( process.env.NODE_ENV !== "production" ?
               require( "./config/webpack.dev.config" ) :
               require( "./config/webpack.prod.config" ) );

// Log out the environment
console.log( "Environment:", process.env.NODE_ENV );

// Adding modules
config.module = {
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
                };

// Adding plugins for CSS
config.plugins.push( new ExtractTextPlugin( "css/style.css" ) ) ;

module.exports = config;
