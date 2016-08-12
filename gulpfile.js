var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var stream = browserSync.stream;

gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(webpack({
            output: {filename: 'main.js'}
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
gulp.task('default', ['build']);