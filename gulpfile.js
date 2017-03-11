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
})

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
  exec( "./node_modules/.bin/gulp clean:public" );
  exec( "./node_modules/.bin/gulp html" );
  exec( "./node_modules/.bin/gulp font" );
} );

gulp.task( "default", [ "html", "font", "minify-css" ] );
