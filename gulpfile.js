var _ = require('lodash');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var webserver = require('gulp-webserver');
var assert = require('assert');


var isProd = process.env.NODE_ENV == "prod";
var isDev = !isProd;
var paths = {
  less: './src/less/*.less',
};
var browserifyOptions = {
  debug: isDev,
  entries: './src/js/main.js',
  transform: [reactify],
  extensions: [".jsx"],

  // Requirements of watchify
  cache: {},
  packageCache: {},
  fullPaths: true
};


gulp.task('js', function() {
  var b = watchify(browserify(browserifyOptions));
  var build = function() {
    b.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulpif(isProd, uglify()))
      .pipe(gulp.dest('./dist/js'));
  };
  b.on('log', gutil.log);
  b.on('update', build);
  build()
});


gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('serve', function() {
  assert(isDev, "Only use static server is Development.");
  return gulp.src('.').pipe(webserver({
    livereload: true,
    directoryListing: false,
    open: true,
    fallback: 'index.html',
  }));
});


gulp.task('dev', ['serve', 'js'], function() {
  gulp.watch(paths.less, ['less'])
});