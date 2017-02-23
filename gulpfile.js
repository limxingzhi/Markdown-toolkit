'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var markdown = require('gulp-markdown');
var clean = require('gulp-clean');
var gulpsync = require('gulp-sync')(gulp);
var headerfooter = require('gulp-headerfooter');
var sass = require('gulp-sass');

var pathMD = ['./docs/*.md', './README.md'];
var pathBUILD = ['./build/*'];

var middlewareExclude = ['.html', '.css', '.js','.png','.jpg'];

gulp.task('build:sass', function () {
  return gulp.src('./styles/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:md', function () {
  return gulp.src(pathMD)
    .pipe(markdown())
    .pipe(headerfooter.header('./partials/header.html'))
    .pipe(headerfooter.footer('./partials/footer.html'))
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', function () {
  return gulp.src('./build', { read: false })
    .pipe(clean());
});

// Static server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./build",
      index: "readme.html"
    },
    middleware: function(req, res, next){
      var containsExtension = false;

      containsExtension = middlewareExclude.some(excludeExtension => {
        if (req.url.includes(excludeExtension)) {
          return true;
        }
      });

      containsExtension = containsExtension || req.url === '' || req.url === '/';

      req.url += containsExtension ? '' : '.html';
      return next();
    },
    port: 8080,
    ui: {
      port: 8081
    }
  });
});

gulp.task('watch', function() {
  // Reload browser when build files changed
  gulp.watch('./styles/*.scss', ['build:sass']);
  gulp.watch(pathMD, ['build:md']);
  gulp.watch(pathBUILD).on("change", browserSync.reload);
});

gulp.task('build', ['build:md', 'build:sass']);
gulp.task('default', gulpsync.sync(['clean', 'build', ['serve','watch']]));