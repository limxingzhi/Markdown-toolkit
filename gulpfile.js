'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var markdown = require('gulp-markdown');
var clean = require('gulp-clean');
var gulpsync = require('gulp-sync')(gulp);
var headerfooter = require('gulp-headerfooter');
var sass = require('gulp-sass');

var pathMD = ['./docs/*'];
var pathBUILD = ['./build/*'];

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
      baseDir: "./build"
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
  gulp.watch("./docs/*.md", ['build:md']);
  gulp.watch("./build/*").on("change", browserSync.reload);
});

gulp.task('build', ['build:md', 'build:sass']);
gulp.task('default', gulpsync.sync(['clean', 'build', ['serve','watch']]));