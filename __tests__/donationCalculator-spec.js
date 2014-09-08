/*global require, jest, describe, beforeEach, afterEach, it, xdescribe, xit*/
jest.dontMock('../src/app/donationCalculator')
    .dontMock('underscore');

describe('../src/app/donationCalculator', function () {
    var sut;
    beforeEach(function () {
        sut = require('../src/app/donationCalculator');
    });
    describe('given an amount to raise of 1200', function () {
        var amountToRaise;
        beforeEach(function () {
            amountToRaise = 1200;
        });
        describe('given a sale price of $20', function () {
            var sellPrice;
            beforeEach(function () {
                sellPrice = 20;
            });
            describe('given an item with flat fee of $530, a royalty fee of $0.10, and a manufacturing fee of $0.95', function () {
                var itemToSell;
                beforeEach(function () {
                    itemToSell = require('../src/app/cdItem');
                    itemToSell.flatFee.mockReturnValue(530);
                    itemToSell.royaltyFee.mockReturnValue(.10);
                    itemToSell.manufacturingTiers.mockReturnValue([
                        {
                            fee: 0.95,
                            upperBound: null
                        }
                    ]);
                });
                describe('when calculating the number of items to sell in order to raise the target amount', function () {
                    var actual;
                    beforeEach(function () {
                        actual = sut.calculateNumberOfItemsToSell(amountToRaise, sellPrice, itemToSell);
                    });
                    it('it should 92 as the number of items to be sold to reach the targeted amount', function () {
                        expect(actual).toEqual(92);
                    });
                });
            });

            describe('given an item with a flat fee of $530, a royalty fee of $0.10, and a manufacturing fee that is determined by the number of CDs bought in bulk', function () {
                var itemToSell;
                var actual;
                beforeEach(function () {
                    itemToSell = require('../src/app/cdItem');
                    itemToSell.flatFee.mockReturnValue(530);
                    itemToSell.royaltyFee.mockReturnValue(.10);
                    itemToSell.manufacturingTiers.mockReturnValue([
                        {
                            fee: 1.25,
                            upperBound: 100
                        },
                        {
                            fee: 0.95,
                            upperBound: 300
                        },
                        {
                            fee: 0.83,
                            upperBound: null
                        }
                    ]);
                    actual = sut.calculateNumberOfItemsToSell(amountToRaise, sellPrice, itemToSell);
                });
                it('it should use the first manufacturing tier with the upper bound that produces a profit larger than the amount to raise to calculate the number of items required to sell', function () {
                    expect(actual).toEqual(93);
                });
            });
        });

        describe('given there is no way to raise the amount based on the expenses', function () {
            var itemToSell;
            beforeEach(function () {
                itemToSell = require('../src/app/cdItem');
                itemToSell.flatFee.mockReturnValue(530);
                itemToSell.royaltyFee.mockReturnValue(.10);
                itemToSell.manufacturingTiers.mockReturnValue([
                    {
                        fee: 1.25,
                        upperBound: 100
                    },
                    {
                        fee: 0.95,
                        upperBound: 300
                    },
                    {
                        fee: 0.83,
                        upperBound: null
                    }
                ]);
            });
            it('should throw an error', function () {
                expect(function () {
                    sut.calculateNumberOfItemsToSell(amountToRaise, 0.50, itemToSell)
                }).toThrow();
            });
        });
    });
});