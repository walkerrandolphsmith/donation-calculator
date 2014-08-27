'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var args = require('yargs').argv;
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var config = {
    optimize: args.optimize || false,
    port: 8094,
    src: {
        styles: './src/styles/styles.less',
        scripts: './src/app/index.js',
        html: ['./src/index.html']
    },
    dest: {
        path: './public',
        styles: './public/css',
        scripts: './public/js'
    }
};

gulp.task('styles', ['clean'], function () {
    return  styles(gulp.src(config.src.styles));
});

gulp.task('scripts', ['clean'], function () {
    return scripts(gulp.src(config.src.scripts));
});

gulp.task('clean', [], function () {
    return gulp.src(config.dest.path, {read: false})
        .pipe(clean());
});

gulp.task('dev', ['clean', 'connect'], function () {
    var styleStream = gulp.src(config.src.styles)
        .pipe(watch());
    styles(styleStream)
        .pipe(connect.reload());
    var scriptsStream = gulp.src(config.src.scripts)
        .pipe(watch());
    scripts(scriptsStream)
        .pipe(connect.reload());
    var htmlStream = gulp.src(config.src.html)
        .pipe(watch());
    html(htmlStream)
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    return connect.server({
        root: config.dest.path,
        port: config.port,
        livereload: true
    });
});

gulp.task('html', ['clean'], function () {
    return html(gulp.src(config.src.html));

});

gulp.task('default', ['dev'], function () {
});

gulp.task('build', ['scripts', 'styles', 'html'], function () {
});

function styles(stream) {
    stream
        .pipe(less())
        .pipe(rename('main.css'));
    if (config.optimize) {
        stream.pipe(minifyCss());
    }
    return stream
        .pipe(gulp.dest(config.dest.styles));

}
function scripts(stream) {
    stream
        .pipe(browserify())
        .pipe(rename('main.js'));
    if (config.optimize) {
        stream.pipe(uglify());
    }
    return stream
        .pipe(gulp.dest(config.dest.scripts));
}
function html(stream) {
    return stream
        .pipe(gulp.dest(config.dest.path));
}