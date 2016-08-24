var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var stream = browserSync.stream;
var ghpages = require('gh-pages');
var path = require('path');

const cssSources = 'src/css/*';
const webPackConfig = {
    output: {filename: 'main.js'},
    devtool: 'sourcemap',
    resolve: {
        modulesDirectories: ['node_modules', './src/js']
    }
};
var buildFolder = 'dist';
gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(webpack(webPackConfig))
        .pipe(gulp.dest(buildFolder)).pipe(stream());
});

gulp.task('styles', function () {
    return gulp.src([cssSources]).pipe(gulp.dest('dist')).pipe(stream());
});

gulp.task('index', ['styles', 'scripts'], function () {
    return gulp.src(['src/index.html', 'src/icons/*']).pipe(gulp.dest(buildFolder)).pipe(stream());
});

gulp.task('server', ['index'], function () {
    browserSync({
        server: {
            baseDir: buildFolder
        }
    });
});


gulp.task('watch', ['server'], function () {
    gulp.watch('src/js/**/*', ['scripts']);
    gulp.watch(cssSources, ['styles']);
    gulp.watch('src/index.html', ['index']);
});

gulp.task('build', ['index']);
gulp.task('publish', ['build'], function (end) {
    ghpages.publish(path.join(__dirname, buildFolder), {
        logger: function (message) {
            console.log(message);
        }
    }, end);
});
gulp.task('default', ['build']);