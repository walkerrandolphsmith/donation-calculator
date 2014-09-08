/** @jsx React.DOM */
jest.dontMock('../src/app/donationWidget');

describe('../src/app/donationWidget', function() {
    it('changes the text after click', function() {
        var React = require('react/addons');
        var donationWidget = require('../src/app/donationWidget');
        var TestUtils = React.addons.TestUtils;

        // Render a checkbox with label in the document
        var amountToRaiseInput = TestUtils.renderIntoDocument(
            <donationWidget />
        );

        // Verify that it's Off by default
        var input = TestUtils.findRenderedDOMComponentWithTag(
            amountToRaiseInput, 'input');
        expect(input.getDOMNode().getAttribute('value')).toEqual('0');

        // Simulate a click and verify that it is now On
        TestUtils.Simulate.change(input);
        expect(input.getDOMNode().getAttribute('value')).toEqual('10');

    });
});