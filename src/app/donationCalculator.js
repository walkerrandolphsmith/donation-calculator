'use strict';

var donationCalculator = {
    raise: raise
};
module.exports = donationCalculator;

function raise(amountToRaise) {
    return {
        getTargetProfit: function(){
            return amountToRaise;
        }
    }
}