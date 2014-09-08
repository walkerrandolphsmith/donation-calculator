/** @jsx React.DOM */
var React = require('react/addons');
//var calc = require('donationCalulator');
//var item = require('cdItem');

var DonationWidget = React.createClass({
    getInitialState: function() {
        return {
            value: 0
        };
    },
    handleChange: function(event) {
        return this.setState({value: 10 /*calc.calculateNumberOfItemsToSell(event.target.value, 20, item)*/});
    },
    render: function() {
        var value = this.state.value;
        return (
            <label>
                <input type="number" value={value} onChange={this.handleChange} />
            </label>
            );
    }
});

module.exports = DonationWidget;
