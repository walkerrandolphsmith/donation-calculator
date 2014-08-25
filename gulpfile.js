var gulp = require('gulp');

var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
connect = require('gulp-connect');
lr = require('tiny-lr');


// Compile Less
gulp.task('less', function() {
    return gulp.src('src/styles/styles.less')
        .pipe(less())
        .pipe(gulp.dest('app/styles'));
});

//Concat & Minify CSS
gulp.task('styles', function(){
    gulp.src('app/styles/styles.css')
        .pipe(concat('styles.css'))
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('app/styles'))
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/styles/*.less', ['less']);
});

gulp.task('connect', function(){
    connect.server({
        root: ['app'],
        port: 4000,
        liverreload: true
    });
});

gulp.task('run', ['connect', 'watch']);

// Default Task
gulp.task('default', ['less', 'run']);