/** @jsx React.DOM */
jest.dontMock('../src/app/donationWidget');

var React = require('react/addons');
var sut = require('../src/app/donationWidget');
var TestUtils = React.addons.TestUtils;

describe('../src/app/donationWidget', function () {
    var renderedDonationWidget;
    var input;
    var span;
    var calculator = require('../src/app/donationCalculator');
    var cdItem = require('../src/app/cdItem');

    beforeEach(function () {
        // Render donation widget
        renderedDonationWidget = TestUtils.renderIntoDocument(
           sut()
        );
        // Verify that it has default value
        input = TestUtils.findRenderedDOMComponentWithTag(renderedDonationWidget, 'input');
        span = TestUtils.findRenderedDOMComponentWithTag(renderedDonationWidget, 'span');
    });
    describe('when a numeric value is entered into the input field', function () {

        var inputValue;
        beforeEach(function () {
            inputValue = '12';
            input.getDOMNode().setAttribute('value', inputValue);
            TestUtils.Simulate.change(input);
            calculator.calculateNumberOfItemsToSell.mockReturnValue(100);
        });

        it('should use the donation calculator with the given input, a sell price of $20, and a CD item.', function(){
            expect(calculator.calculateNumberOfItemsToSell).toBeCalledWith(12,20,cdItem);
        });

        it('should update the span with the results of the calculator', function(){
           expect(span.getDOMNode().textContent).toEqual('100');
        });

    });

    describe('when a non-numeric value is entered into the input field', function(){
        var inputValue;
        beforeEach(function(){
            inputValue = "yolo";
            input.getDOMNode().setAttribute('value', inputValue);
            TestUtils.Simulate.change(input);
        });

        it('should update the span with a message indicating numeric values only', function(){
          expect(span.getDOMNode().textContent).toEqual("Only enter numeric values.");
        });
    });
});