var app = angular.module('DonateApp', ['ui.bootstrap']);

app.controller('DonateController', function($scope, $http) {

    $scope.priceOfFundraiserItem = 10;
    $scope.values = {goal: 1, participants: 1};

    $scope.totalNumberOfFundraiserItemsToSell = function () {
        return $scope.values.goal / $scope.priceOfFundraiserItem;
    }

    $scope.NumberOfFundraiserItemsToSellPerActiveParticipants = function (percentage) {
        var numberOfActiveParticipants = $scope.values.participants * percentage;
        return Math.ceil($scope.totalNumberOfFundraiserItemsToSell()/numberOfActiveParticipants);
    }
});