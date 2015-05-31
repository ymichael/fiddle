var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var webserver = require('gulp-webserver');


var paths = {
  stylesheets: [
    './stylesheets/normalize.css',
    './stylesheets/main.less'
  ],
  javascript: './main.js',
  dist: './build'
};


gulp.task('stylesheets', function() {
  return gulp.src(paths.stylesheets)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat('all.css'))
    .pipe(gulp.dest(paths.dist))
});


var browserifyOptions = {
  // Enables source maps.
  // debug: true,
  entries: paths.javascript,
  transform: [reactify],
  extensions: [".jsx"],
  // Requirements of watchify
  cache: {},
  packageCache: {}
};


gulp.task('javascript', function() {
  var b = watchify(browserify(browserifyOptions));
  var build = function() {
    b.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('all.js'))
      .pipe(buffer())
      // .pipe(uglify())
      .pipe(gulp.dest(paths.dist));
  };
  b.on('log', gutil.log);
  b.on('update', build);
  build();
});


gulp.task('serve', function() {
  return gulp.src('.').pipe(webserver({
    livereload: true,
    directoryListing: false,
    open: true,
    fallback: 'index.html'
  }));
});


gulp.task('dev', ['serve', 'stylesheets', 'javascript'], function() {
  gulp.watch(paths.stylesheets, ['stylesheets']);
});