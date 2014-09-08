/** @jsx React.DOM */
jest.dontMock('../src/app/donationWidget');

describe('../src/app/donationWidget', function() {
    it('changes the text after click', function() {
        var React = require('react/addons');
        var donationWidget = require('../src/app/donationWidget');
        var TestUtils = React.addons.TestUtils;

        // Render donation widget
        var amountToRaiseInput = TestUtils.renderIntoDocument(
            <donationWidget />
        );

        // Verify that it has default value
        var input = TestUtils.findRenderedDOMComponentWithTag(
            amountToRaiseInput, 'input');
        expect(input.getDOMNode().getAttribute('value')).toEqual('0');

        // Simulate a change in input and value change
        TestUtils.Simulate.change(input);
        expect(input.getDOMNode().getAttribute('value')).toEqual('10');

    });
});