/** @jsx React.DOM */
var React = require('react');
var calc = require('./donationCalculator');
var item = require('./cdItem');

var DonationWidget = React.createClass({
    getInitialState: function() {
        return {
            amountToRaise: 0,
            numberOfItemsToSell: 0
        };
    },
    handleChange: function(event) {
        var inputValue = event.target.value;
        var numberOfItemsToSell;

        if(isNaN(inputValue)){
            numberOfItemsToSell = "Only enter numeric values.";
        }else{
            var numericInputValue = parseInt(inputValue);
            numberOfItemsToSell =  calc.calculateNumberOfItemsToSell(numericInputValue, 20, item)
        }

        return this.setState(
            {
                amountToRaise: inputValue,
                numberOfItemsToSell: numberOfItemsToSell
            }
        );
    },
    render: function() {
        var amountToRaise = this.state.amountToRaise;
        var numberOfItemsToSell = this.state.numberOfItemsToSell;
        return (
            <label>
                <input type="number" value={amountToRaise} onChange={this.handleChange} />
                <span>{numberOfItemsToSell}</span>
            </label>

            );
    }
});

module.exports = DonationWidget;
