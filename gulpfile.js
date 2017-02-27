const gulp = require('gulp');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const stream = browserSync.stream;
const ghpages = require('gh-pages');
const path = require('path');
const del = require('del');
const concatCSS = require('gulp-concat-css');
const gutil = require('gulp-util');
const template = require('gulp-template');
const webpack2 = require('webpack');

const buildOut = 'build/';
const config = {
  web: {
    scripts: 'src/js/**/*',
    styles: 'src/css/*',
    images: ['src/icons/*', 'src/favicon.ico'],
    index: 'src/index.html',
    webpack: {
      entry: './src/js/main.js',
      watch: false,
      output: {filename: 'main.js'},
      devtool: 'sourcemap'
    },
    dest: buildOut + 'web',
  },
  plugin: {
    chrome: {
      scripts: 'chrome/**/*',
      styles: 'src/css/*',
      images: ['src/icons/*', 'src/favicon.ico'],
      index: 'src/index.html',
      dest: buildOut + 'plugin/chrome',
      webpack: {
        entry: './chrome/main.js',
        watch: false,
        output: {filename: 'script.js'},
        devtool: 'sourcemap'
      }
    }
  },
  dest: buildOut,
  production: false,
};

const current = process.argv[3] === '--chrome' ? config.plugin.chrome : config.web;

gulp.task('clean', function () {
  return del([buildOut]);
});

gulp.task('scripts', function () {
  return gulp.src(current.webpack.entry).
      pipe(webpack(current.webpack, webpack2)).
      pipe(gulp.dest(current.dest)).
      pipe(stream());
});

gulp.task('styles', function () {
  return gulp.src([current.styles]).
      pipe(config.production ? concatCSS('style.css') : gutil.noop()).
      pipe(gulp.dest(current.dest)).
      pipe(stream());
});

gulp.task('images', function () {
  return gulp.src(current.images).pipe(gulp.dest(current.dest));
});

gulp.task('index', function () {
  return gulp.src(current.index).pipe(template(current.webpack)).pipe(gulp.dest(current.dest)).pipe(stream());
});

gulp.task('static:web', ['styles', 'scripts', 'images', 'index']);

gulp.task('server', ['static:web'], function () {
  browserSync({
    server: {
      baseDir: current.dest
    }
  });
});

gulp.task('watch', ['server'], function () {
  gulp.watch(current.scripts, ['scripts']);
  gulp.watch(current.styles, ['styles']);
  gulp.watch(current.index, ['index']);
});

gulp.task('build:web', ['static:web']);

gulp.task('static:chrome', function () {
  return gulp.src(config.plugin.chrome.scripts).pipe(gulp.dest(config.plugin.chrome.dest));
});

gulp.task('build:chrome', ['build:web', 'static:chrome']);

gulp.task('publish', ['build:web'], function (end) {
  ghpages.publish(path.join(__dirname, current.dest), {
    logger: function (message) {
      console.log(message);
    }
  }, end);
});

gulp.task('build', ['build:web', 'build:chrome']);

gulp.task('default', ['build']);