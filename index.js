var express = require( "express" );
var app = express();
var axios = require( 'axios' );
var request = require( "request" );
var cheerio = require( "cheerio" );
var webpack = require( "webpack" );
var webpackDevMiddleware = require( "webpack-dev-middleware" );
var webpackHotMiddleware = require( "webpack-hot-middleware" );
var webpackConfig = require( "./webpack.config.js" );
var compiler = webpack( webpackConfig );

// Configuration on hot-reloader; to be use in conjunction with Express
if( process.env.NODE_ENV !== "production" ) {

  // Define the use of webpack-dev-middleware
  app.use( webpackDevMiddleware( compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  } ) );

  // Define the use of webpack-hot-middleware
  app.use( webpackHotMiddleware( compiler, {
    log: console.log
  } ) );

}

// Expose the js and css folder...
app.use( "/js", express.static( __dirname + "/public/js" ) );
app.use( "/css", express.static( __dirname + "/public/css" ) );

// Display the main page
app.get( "/", function( req, res ) {
  res.sendFile( __dirname + "/public/index.html" );
})

// Get the full detail of the particular article
app.get( "/news/result", function( req, res ) {

  var urlEndpoint = req.query.url;

  var options = {
    url: urlEndpoint,
    maxRedirects: 20,
    followRedirect: true,
    jar: true
  };

  request( options, function( error, response, body ) {
    if( !error && response.statusCode === 200 ) {

      var document = cheerio.load( body );
      var title = document( "h1#headline" ).html();
      var bylineAuthors = document( "span.byline-author" );
      var date = document( "time.dateline" ).eq( 0 ).html();
      var contentElements = document( "p.story-body-text.story-content" );
      var contents = [];
      var authors = [];
      var article = {};

      bylineAuthors.each( function( index ) {
        authors.push( String( bylineAuthors.eq( index ).html() ) );
      } );

      contentElements.each( function( index ) {
        contents.push( String( contentElements.eq( index ).html() ) );
      } )

      article.title = title;
      article.authors = authors;
      article.date = date;
      article.contents = contents;
      article.url = urlEndpoint;

      // Send response in object state
      res.send( article );

    } else {
      // Just in case and fallback error message
      res.send( { "error": "Something is wrong with the request" } );
    }

  } );

} );

// Route to get the news categories and its abstract details
app.get( "/news/categories", function( req, res ) {
  // Retrieving the details of the news
  var categories = req.query.categories;
  var nykeys = process.env.NY_TIMES_TOP_STORIES_KEY;
  var endpoint = `https://api.nytimes.com/svc/topstories/v2/${ categories }.json`;
  var url = endpoint + "?apikey=" + nykeys;

  axios.get( url ).then( function( response ) {
    res.send( response.data )
  });

} );

app.listen( "8080", function() {
  console.log( "listening in port 8080" );
} );
