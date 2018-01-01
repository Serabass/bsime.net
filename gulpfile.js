var gulp = require('gulp'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  log = require('gulp-log'),
  cssmin = require('gulp-cssmin'),
  // TODO use https://github.com/morris/vinyl-ftp
  ftp = require('vinyl-ftp'),
  gutil = require('gulp-util'),
  path = require('path');


var paths = {
  templates: ['index.jade'],
  styles: ['./assets/css/**/*.sass']
};

require('dotenv').config();

function ftpDefaults() {
  var args = [].slice.call(arguments);
  args.unshift(process.env.FTP_REMOTE_PATH);
  var remotePath = path.join.apply(path, args);
  return ftp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    pass: process.env.FTP_PASSWORD,
    remotePath: remotePath
  });
}

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(jade())
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function() {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('deploy', ['build'], function() {

  var conn = ftp.create({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'assets/css/main.css',
    'assets/css/fonts/**',
    'assets/img/**/**',
    'assets/js/**/**',
    'index.html'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, {base: '.', buffer: false})
  //.pipe(log())
    .pipe(conn.newer('/')) // only upload newer files
    .pipe(conn.dest('/'));

});

gulp.task('serve', function () {
  var tpl = paths.templates.slice();
  tpl.push('blocks/**/*.jade');
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.styles, ['sass']);
});
gulp.task('build', ['templates', 'sass']);

gulp.task('default', ['build']);
