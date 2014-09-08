'use strict';
var _ = require('underscore');

var donationCalculator = {
    calculateNumberOfItemsToSell: calculateNumberOfItemsToSell
};
module.exports = donationCalculator;

function calculateNumberOfItemsToSell(amountToRaise, sellPrice, itemTypeToSell) {
    // n = (net + flatFee)/(sellPrice - perCdPrice - bulk)
    var targetTier = _.find(itemTypeToSell.manufacturingTiers(), function (tier) {
        var profit = (tier.upperBound * sellPrice) - itemTypeToSell.flatFee() - (itemTypeToSell.royaltyFee() * tier.upperBound) - (tier.fee * tier.upperBound);
        return tier.upperBound === null || amountToRaise < profit;
    });
    if (sellPrice <= targetTier.fee + itemTypeToSell.royaltyFee()) {
        throw "Cannot raise target amount";
    }
    return Math.ceil((amountToRaise + itemTypeToSell.flatFee()) / (sellPrice - itemTypeToSell.royaltyFee() - targetTier.fee));

}