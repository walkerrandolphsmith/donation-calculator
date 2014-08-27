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
var nunjucks = require('gulp-nunjucks-render');
var gulpFilter = require('gulp-filter');
var htmlFilter = gulpFilter(['./templates/**/*.html']);
var pkg = require('./package.json');
var config = {
    optimize: args.optimize || false,
    port: 8094,
    styles: {
        src: './src/styles/styles.less',
        dest: './public/css',
        name: pkg.name + '.css'
    },
    scripts: {
        src: './src/app/index.js',
        dest: './public/js',
        name: pkg.name + '.js'

    },
    html: {
        src: ['./src/index.html', './templates/**/*.html'],
        dest: './public',
        name: 'index.html'
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
    var htmlStream = gulp.src(config.html.src);
    htmlStream
        .pipe(watch({
            emit: 'all',verbose: true
        }));
    html(htmlStream);
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

function styles(stream) {
    stream
        .pipe(less())
        .pipe(rename('main.css'));
    if (config.optimize) {
        stream.pipe(minifyCss());
    }
    return stream
        .pipe(gulp.dest(config.styles.dest));

}
function scripts(stream) {
    stream
        .pipe(browserify())
        .pipe(rename('main.js'));
    if (config.optimize) {
        stream.pipe(uglify());
    }
    return stream
        .pipe(gulp.dest(config.scripts.dest));
}
function html(stream) {
    return stream
        .pipe(nunjucks())
        .pipe(gulp.dest(config.html.dest));
}