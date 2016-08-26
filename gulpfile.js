var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var stream = browserSync.stream;
var ghpages = require('gh-pages');
var path = require('path');
var del = require('del');

var buildOut = 'build/';
const config = {
    web: {
        scripts: 'src/js/**/*',
        styles: 'src/css/*',
        static: ['src/index.html', 'src/icons/*'],
        webpack: {
            main: 'src/js/main.js',
            watch: false,
            output: {filename: 'main.js'},
            devtool: 'sourcemap',
            resolve: {
                modulesDirectories: ['node_modules', './src/js']
            }
        },
        dest: buildOut + 'web',
    },
    plugin: {
        chrome: {
            scripts: 'chrome/**/*',
            dest: buildOut + 'plugin/chrome',
        }
    },
    dest: buildOut
};

gulp.task('clean', function () {
    return del([buildOut]);
});

gulp.task('scripts', function () {
    return gulp.src(config.web.webpack.main)
        .pipe(webpack(config.web.webpack))
        .pipe(gulp.dest(config.web.dest)).pipe(stream());
});

gulp.task('styles', function () {
    return gulp.src([config.web.styles]).pipe(gulp.dest(config.web.dest)).pipe(stream());
});

gulp.task('static:web', ['styles', 'scripts'], function () {
    return gulp.src(config.web.static).pipe(gulp.dest(config.web.dest)).pipe(stream());
});

gulp.task('server', ['static:web'], function () {
    browserSync({
        server: {
            baseDir: config.web.dest
        }
    });
});

gulp.task('watch', ['server'], function () {
    gulp.watch(config.web.scripts, ['scripts']);
    gulp.watch(config.web.styles, ['styles']);
    gulp.watch(config.web.static, ['static:web']);
});

gulp.task('build:web', ['static:web']);

gulp.task('static:chrome', function () {
    return gulp.src(config.plugin.chrome.scripts)
        .pipe(gulp.dest(config.plugin.chrome.dest));
});

gulp.task('build:chrome', ['build:web', 'static:chrome'], function () {
    return gulp.src(config.web.dest + '/*.*')
        .pipe(gulp.dest(config.plugin.chrome.dest + '/popup'));
});

gulp.task('publish', ['build:web'], function (end) {
    ghpages.publish(path.join(__dirname, config.web.dest), {
        logger: function (message) {
            console.log(message);
        }
    }, end);
});

gulp.task('build', ['build:web', 'build:chrome']);

gulp.task('default', ['build']);