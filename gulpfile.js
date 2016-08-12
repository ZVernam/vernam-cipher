var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(webpack({
            output: {filename: 'main.js'}
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function () {
    return gulp.src([
        'src/css/*',
        'src/index.html'
    ]).pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'scripts']);