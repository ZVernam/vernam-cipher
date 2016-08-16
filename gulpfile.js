var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var stream = browserSync.stream;
var ghpages = require('gh-pages');
var path = require('path');

gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(webpack({
            output: {filename: 'main.js'},
            resolve: {
                modulesDirectories: ['node_modules', './src/js']
            }
        }))
        .pipe(gulp.dest('dist')).pipe(stream());
});

gulp.task('styles', function () {
    return gulp.src(['src/css/*']).pipe(gulp.dest('dist')).pipe(stream());
});

gulp.task('index', ['styles', 'scripts'], function () {
    return gulp.src('src/index.html').pipe(gulp.dest('dist'));
});

gulp.task('server', ['index'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});


gulp.task('watch', ['server'], function () {
    gulp.watch('src/js/*.*', ['scripts']);
    gulp.watch('src/css/*.*', ['styles']);
});

gulp.task('build', ['index']);
gulp.task('publish', ['build'], function (end) {
    ghpages.publish(path.join(__dirname, 'dist'), {
        logger: function(message) {
            console.log(message);
        }
    }, end);
});
gulp.task('default', ['build']);