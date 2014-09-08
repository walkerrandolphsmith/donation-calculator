'use strict';

var cdItem = {
    royaltyFee: function () {
        return .728;
    },
    manufacturingTiers: function () {
        return [
            {
                fee: 1.25,
                upperBound: 100
            },
            {
                fee: 0.95,
                upperBound: null
            }
        ]
    },
    flatFee: function () {
        return 530;
    }
};
module.exports = cdItem;