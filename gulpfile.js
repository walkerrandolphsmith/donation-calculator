'use strict';

var gulp = require('gulp');
var path = require('path');
var karma = require('karma').server;
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var args = require('yargs').argv;
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var karmaParseConfig = require('karma/lib/config').parseConfig;
var pkg = require('./package.json');
var config = {
    optimize: args.optimize || false,
    port: 8094,
    styles: {
        src: './src/styles/index.less',
        dest: './public/css',
        name: pkg.name + '.css'
    },
    scripts: {
        src: './src/app/index.js',
        dest: './public/js',
        name: pkg.name + '.js'

    },
    html: {
        src: ['./src/index.html'],
        dest: './public',
        name: 'index.html'
    },
    tests: {
        unit: './test/karma.config.unit.js'
    }
};

gulp.task('styles', ['clean'], function () {
    return  styles(gulp.src(config.styles.src));
});

gulp.task('scripts', ['clean'], function () {
    return scripts(gulp.src(config.scripts.src));
});

gulp.task('clean', [], function () {
    return gulp.src(config.html.dest, {read: false})
        .pipe(clean());
});

gulp.task('dev', ['clean', 'connect'], function () {
    var styleStream = gulp.src(config.styles.src)
        .pipe(watch());
    styles(styleStream)
        .pipe(connect.reload());
    var scriptsStream = gulp.src(config.scripts.src)
        .pipe(watch());
    scripts(scriptsStream)
        .pipe(connect.reload());
    html(gulp.src(config.html.src));
});

gulp.task('connect', function () {
    return connect.server({
        root: config.html.dest,
        port: config.port,
        livereload: true
    });
});

gulp.task('html', ['clean'], function () {
    return html(gulp.src(config.html.src));

});

gulp.task('default', ['dev'], function () {
});

gulp.task('build', ['scripts', 'styles', 'html'], function () {
});

gulp.task('tests-unit', [], function (done) {
    var karmaConfig = karmaParseConfig(path.resolve(config.tests.unit), {});
    karma.start(karmaConfig, done);
});

function styles(stream) {
    stream
        .pipe(less())
        .pipe(rename(config.styles.name));
    if (config.optimize) {
        stream.pipe(minifyCss());
    }
    return stream
        .pipe(gulp.dest(config.styles.dest));

}
function scripts(stream) {
    stream
        .pipe(browserify())
        .pipe(rename(config.scripts.name));
    if (config.optimize) {
        stream.pipe(uglify());
    }
    return stream
        .pipe(gulp.dest(config.scripts.dest));
}
function html(stream) {
    return stream
        .pipe(gulp.dest(config.html.dest));
}