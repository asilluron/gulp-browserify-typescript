'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const stream = require('stream');
const tsify = require('tsify');
const defaultOpts = {
  watch: false,
  src: ['./app.ts'],
  outputPath: 'build/',
  outputFile: 'app.bundle.js',
  minify: false,
  sourcemaps: true,
  browserify: {
    cache: {},
    packageCache: {}
  },
  sourcemap: {
    sourceRoot: './'
  },
  watchify: {},
  tsify: {},
  uglify: {},
  onError: function (err) {
    console.error(err.toString());
    this.emit('end');
  },
  onLog: log => {
    console.log(log);
  }
};

function gulpTask (userOptions) {
  let options = {};
  let passThrough = () => new stream.PassThrough({ objectMode: true });
  Object.assign(options, defaultOpts, userOptions);
  let b = browserify(options.src, options.browserifyOptions)
    .plugin(tsify, options.tsify);
  if (options.watch === true) {
    b = watchify(b, options.watchify);
    b.on('update', bundle);
    b.on('log', options.onLog);
  }

  return bundle();

  function bundle () {
    return b.bundle()
      .on('error', options.onError)
      .pipe(source(options.outputFile))
      .pipe(buffer())
      .pipe(options.sourcemaps ? sourcemaps.init({ loadMaps: true }) : passThrough())
      .pipe(options.minify ? uglify(options.uglify) : passThrough())
      .pipe(options.sourcemaps ? sourcemaps.write('./', {includeContent: true, sourceRoot: options.sourcemap.sourceroot}) : passThrough())
      .pipe(gulp.dest(options.outputPath));
  }
}

module.exports = gulpTask;
