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
var shell = require('gulp-shell');
var react = require('gulp-react');
var pkg = require('./package.json');

var config = {
    optimize: args.optimize || false,
    port: 4000,
    styles: {
        src: './src/styles/index.less',
        dest: './public/css',
        name: pkg.name + '.css'
    },
    scripts: {
        src: './src/app/**/*.js',
        dest: './public/js',
        name: pkg.name + '.js',
        build: './build'

    },
    html: {
        src: ['./src/index.html'],
        dest: './public',
        name: 'index.html'
    }
};

gulp.task('html', ['clean'], function() {
    return gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('styles', ['clean'], function () {
    return gulp.src(config.styles.src)
        .pipe(less())
        .pipe(rename(config.styles.name))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.styles.dest));
});

gulp.task('scripts', ['clean', 'reactify'], function () {
    return gulp.src('./build/index.js')
     .pipe(browserify())
     .pipe(rename(config.scripts.name))
     .pipe(uglify())
     .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('reactify', ['clean'], function() {
    return gulp.src(config.scripts.src)
        .pipe(react())
        .pipe(gulp.dest(config.scripts.build));
});

gulp.task('clean', [], function () {
    return gulp.src([config.html.dest, config.scripts.build], {
            read: false
          })
   .pipe(clean());
});

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', ['clean', 'connect', 'build'], function() {
      return gulp.src(config.html.dest)
        .pipe(watch())
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    return connect.server({
        root: config.html.dest,
        port: config.port,
        livereload: true
    });
});

gulp.task('build', ['scripts', 'styles', 'html'], function () {
});

gulp.task('test-unit', shell.task(['jest']));
