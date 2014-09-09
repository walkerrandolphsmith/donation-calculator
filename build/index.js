'use strict';

var donationWidget = require('./donationWidget');
var react = require('react');
var el = document.getElementsByTagName('body')[0];
react.renderComponent(donationWidget(), el);