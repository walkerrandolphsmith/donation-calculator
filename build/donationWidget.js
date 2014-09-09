/** @jsx React.DOM */
var React = require('react');
var calc = require('./donationCalculator');
var item = require('./cdItem');

var DonationWidget = React.createClass({displayName: 'DonationWidget',
    getInitialState: function() {
        return {
            amountToRaise: 0,
            numberOfItemsToSell: 0
        };
    },
    handleChange: function(event) {
        var inputValue = event.target.value;
        var numericInputValue = parseInt(inputValue);
        return this.setState(
            {
                amountToRaise: inputValue,
                numberOfItemsToSell: calc.calculateNumberOfItemsToSell(numericInputValue, 20, item)
            }
        );
    },
    render: function() {
        var amountToRaise = this.state.amountToRaise;
        var numberOfItemsToSell = this.state.numberOfItemsToSell;
        return (
            React.DOM.label(null, 
                React.DOM.input({type: "number", value: amountToRaise, onChange: this.handleChange}), 
                React.DOM.span(null, numberOfItemsToSell)
            )

            );
    }
});

module.exports = DonationWidget;
