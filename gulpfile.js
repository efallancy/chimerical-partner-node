var gulp = require( "gulp" );
var cleanCSS = require( "gulp-clean-css" );
var runSequence = require( "run-sequence" );
var del = require( "del" );
var exec = require( "child_process" ).exec;

gulp.task( "html", function() {
  return gulp.src( "src/template/*.html" )
             .pipe( gulp.dest( "public" ) );
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

gulp.task( "default", [ "html", "minify-css" ] );