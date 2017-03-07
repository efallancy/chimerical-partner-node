var express = require( "express" );
var app = express();
var axios = require( 'axios' );
var request = require( "request" );
var cheerio = require( "cheerio" );

app.use( express.static( "public" ) );

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
