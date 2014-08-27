/*global define, describe, beforeEach, afterEach, it*/
'use strict';

describe('src/app/donationCalculator.js', function () {
    var sut;
    beforeEach(function () {
        sut = require('./test-spec');
    });
    describe('given the target amount to raise is 1200 dollars', function () {
        var target;
        beforeEach(function () {
            target = 1200;
        });
        describe('given there are 20 participants', function () {
            var participants;
            beforeEach(function () {
                participants = 20;
            });
            describe('when calculating the total number of CDs required to sell to meet the target amount', function () {
                var actual;
                beforeEach(function () {
                    actual = sut.calculateNumberOfCds(1200, 20);
                });
                it('it should return 100 CDs', function () {
                    actual.should.equal(100);
                });
            });
        });
    });
});