var gulp = require( "gulp" );
var cleanCSS = require( "gulp-clean-css" );
var del = require( "del" );
var exec = require( "child_process" ).exec;

gulp.task( "html", function() {
  return gulp.src( "src/template/*.html" )
             .pipe( gulp.dest( "public" ) );
} );

gulp.task( "font", function() {
  return gulp.src( "src/assets/fonts/*.ttf" )
             .pipe( gulp.dest( "public/assets/fonts" ) );
} );

gulp.task( "icons", function() {
  return gulp.src( "src/assets/weather_icons/*.svg" )
             .pipe( gulp.dest( "public/assets/weather_icons" ) );
} );

gulp.task( "minify-css", function() {
  return gulp.src( "public/css/*.css" )
             .pipe( cleanCSS() )
             .pipe( gulp.dest( "public/css" ) );
} );

gulp.task( "watch", function() {
  gulp.watch( "public/css/*.css", [ "minify-css" ] );
} );

gulp.task( "clean:public", function() {
  return del.sync( "public" );
} );

gulp.task( "build:init", function() {
  // This is implemented in this way to take in order of priorities
  exec( "./node_modules/.bin/gulp clean:public" );
  exec( "./node_modules/.bin/gulp icons" );
  exec( "./node_modules/.bin/gulp font" );
  exec( "./node_modules/.bin/gulp html" );
} );

gulp.task( "default", [ "html", "font", "icons", "minify-css" ] );
