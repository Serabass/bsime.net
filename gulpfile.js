var gulp = require('gulp'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  log = require('gulp-log');

gulp.task('templates', function() {
  return gulp.src('index.jade')
    .pipe(jade())
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function() {
  return gulp.src('./assets/css/*.sass')
    .pipe(log())
    .pipe(sass())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['templates', 'sass']);
