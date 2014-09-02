/*global define, describe, beforeEach, afterEach, it*/
'use strict';

describe('src/app/donationCalculator.js', function () {
    var sut;
    beforeEach(function () {
        sut = require('./../../src/app/donationCalculator.js');
    });
    describe('given no target amount has been set', function () {
        var target;
        beforeEach(function () {
            target = 1200;
        });
        describe('when setting the target amount', function () {
            var actual;
            beforeEach(function () {
                actual = sut.raise(target);
            });
            it('it should return a donation context with the target amount set to the specified value', function () {
                actual.getTargetProfit().should.equal(target);
            });
        });
    });
    describe('given a target amount has been set', function () {
        var target;
        beforeEach(function () {
            target = 1200;
            sut = sut.raise(target);
        });
        describe('given no item to sell has been set', function () {
            describe('when setting the target item to sell', function () {
                var item;
                beforeEach(function () {
                    item = null;
                    sut.bySelling(item);
                });
                it('it should ???', function () {
                    throw new Error('Not Implemented');
                });
            });
        });
        describe('given an item has been specified as the item to sell', function () {
            var item;
            beforeEach(function () {
                item = null;
                sut.bySelling(item);
            });
            describe('when setting the target item to sell', function () {
                var differentItem;
                beforeEach(function () {
                    differentItem = {};
                    sut.bySelling(differentItem);
                });
                it('it should ???', function () {
                    throw new Error('Not Implemented');
                });
            });
            describe('when getting the number of items required to sell to meet the target goal', function () {
                var actual;
                beforeEach(function () {
                    actual = sut.getTargetNumberOfItems();
                });
                it('it should ???', function () {
                    throw new Error('Not Implemented');
                });
            });
        });
    });
});