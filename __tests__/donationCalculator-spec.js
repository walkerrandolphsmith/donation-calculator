/*global require, jest, describe, beforeEach, afterEach, it, xdescribe, xit*/
jest.dontMock('../src/app/donationCalculator');

describe('../src/app/donationCalculator', function () {
    var sut;
    beforeEach(function () {
        sut = require('../src/app/donationCalculator');
    });

    describe('when raising an amount', function () {
        var actual,
            expected;
        beforeEach(function () {
            expected = 100;
            actual = sut.raise(expected);
        });
        it('it should return the amount to be raised', function () {
            expect(actual).toEqual(expected);
        });
    });
});