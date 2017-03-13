var express = require( "express" );
var app = express();
var axios = require( 'axios' );
var request = require( "request" );
var cheerio = require( "cheerio" );

// Configuration on hot-reloader; to be use in conjunction with Express
if( process.env.NODE_ENV === "development" ) {
  // Only require when in Development
  var webpack = require( "webpack" );
  var webpackDevMiddleware = require( "webpack-dev-middleware" );
  var webpackHotMiddleware = require( "webpack-hot-middleware" );
  var webpackConfig = require( "./webpack.config.js" );
  var compiler = webpack( webpackConfig );

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

// Ensure that it will serve in https. Hence, a redirect before any other routes.
app.use( "*", function( req, res, next ) {
  if( req.header[ "x-forwarded-proto" ] !== "https" ) {
    res.redirect( "https://" + req.hostname + req.originalUrl );
  } else {
    next();
  }
} );

// Serve the js, css and assets folder...
app.use( "/js", express.static( __dirname + "/public/js" ) );
app.use( "/css", express.static( __dirname + "/public/css" ) );
app.use( "/assets", express.static( __dirname + "/public/assets" ) );

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

  // Get the API key from the The New York Times Developers website.
  // Then go to your bash profile to set the API key to a variable (For Mac user)
  var nykeys = process.env.NY_TIMES_TOP_STORIES_KEY;
  var endpoint = `https://api.nytimes.com/svc/topstories/v2/${ categories }.json`;
  var url = endpoint + "?apikey=" + nykeys;

  axios.get( url ).then( function( response ) {
    res.send( response.data )
  });

} );

// Route to get the Weather forecast
app.get( "/weather_forecast", function( req, res ) {

  var latitude = req.query.lat;
  var longitude = req.query.lng;

  // Weather forecast endpoint used is from Forecast.io (Also known as Darksky.net)
  // Get the API key from Darksy.net website and set the key in your environment variable
  var darkskyKey = process.env.DARK_SKY_SECRET;
  var url = `https://api.darksky.net/forecast/${ darkskyKey }/${ latitude },${ longitude }?units=si`;

  axios.get( url ).then( function( response ) {
    res.send( response.data );
  } )

} );

// Route to reverse geocode location
app.get( "/location", function( req, res ) {
  var latitude = req.query.lat;
  var longitude = req.query.lng;

  var googleGeocodeKey = process.env.GOOGLE_GEOCODING_KEY;
  var geocodeEndpoint = "https://maps.googleapis.com/maps/api/geocode/json";
  var geocodeQuery = `?latlng=${ latitude },${ longitude }&key=${ googleGeocodeKey }`
  var geocodeEndpointRequest = geocodeEndpoint + geocodeQuery;

  axios.get( geocodeEndpointRequest )
       .then( function( response ) {
         res.send( response.data );
       } )
} );

// Redirect to main for any undefined route, instead of sending a 404 status/response
app.use( function( req, res, next ) {
  res.redirect( "/" );
} );

app.listen( process.env.PORT || 8080, function() {
  console.log( "listening in port " + ( process.env.PORT || 8080 ) );
} );
