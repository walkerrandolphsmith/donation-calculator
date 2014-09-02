'use strict';

var _ = require('underscore');
var bowerMainFiles = require('main-bower-files');
var fs = require('fs');
var bowerConfig = JSON.parse(fs.readFileSync('./../bower.json'));
var srcFiles = ['./src/app/**/*.js'];
var testFiles = ['./test/unit/**/*.js'];
var thirdPartyFiles = getThirdPartyFiles();
var files = [].concat(thirdPartyFiles, testFiles, srcFiles);

module.exports = function (config) {
    config.set({
        basePath: './../',

        files: files,
        autoWatch: false,
        singleRun: true,
        colors: true,

        frameworks: ['mocha', 'commonjs', 'sinon-chai', 'chai', 'sinon'],

        browsers: ['PhantomJS'],
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
            'karma-sinon',
            'karma-sinon-chai'
        ],
        preprocessors: {
            'test/unit/**/*.js': ['commonjs'],
            'src/**/*.js': ['commonjs'],
            'http://**/*.js': ['commonjs'],
            'bower_components/**/*.js': ['commonjs']
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

function getThirdPartyFiles() {
    var bowerFiles = [];
    if (bowerConfig.dependencies.length > 0) {
        bowerFiles = _.chain(bowerMainFiles())
            .filter(function (item) {
                return (item.substr(-3, 3) === '.js');
            })
            .value();
    }
    var cdnFiles = _.chain(Object.keys(bowerConfig.cdn))
        .map(function (value) {
            return bowerConfig.cdn[value];
        }).value();
    return [].concat(cdnFiles, bowerFiles);
}