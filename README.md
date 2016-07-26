# gulp-browserify-typescript
Browserify typescript with a ton of options.

Requires Node 4.x or higher


## Usage
```
const b = require('gulp-browserify-typescript');

gulp.task('watch', done => {
  b({ watch: true, sourcemaps: true }).on('end', done);
});

```

Then kick it off with
```
gulp watch
```

## Options
* ```sourcemaps``` {boolean} Default: `false`
* ```watch``` {boolean} Default: `false`
* ```src``` {Array} Default: `['./app.ts']`
* ```outputPath``` {string} Default:`'build/'`
* ```outputFile``` {string} Default:`'app.bundle.js'`
* ```minify``` {boolean} Default:`false`
* ```browserify``` {Object} Default:`{}` browserify options
* ```sourcemap``` {Object} Default:`{sourceRoot: './'}` sourcemap options
* ```watchify``` {Object} Default:`{}` watchify options
* ```tsify``` {Object} Default:`{}` tsify options
* ```uglify``` {Object} Default:`{}` uglify options
* ```onError``` {Function} "function(err) {...}"
* ```onLog``` {Function} "function(log) {...}" set in order to override default log behavior


