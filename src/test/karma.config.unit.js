'use strict';

var testFiles = ['./test/unit/**/*-spec.js'];
var files = [].concat(testFiles);

module.exports = function (config) {
    config.set({
        basePath: './../',

        files: files,
        deps: ['./app/**/*.js'],
        autoWatch: false,
        singleRun: true,
        colors: true,

        frameworks: ['mocha', 'commonjs', 'chai', 'sinon'],

        browsers: ['Chrome', 'PhantomJS'],
        reports: [
            'progress',
            'junit'
        ],
        plugins: [
            'karma-junit-reporter',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-commonjs',
            'karma-chai',
            'karma-sinon'
        ],
        preprocessors: {
            '**/*.js': ['commonjs']
        },
        junitReporter: {
            outputFile: 'test/out/unit.xml',
            suite: 'unit'
        },
        client: {
            mocha: {
                ui: 'bdd'
            }
        }
    });
};