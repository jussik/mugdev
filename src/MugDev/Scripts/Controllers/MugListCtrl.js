(function () {
    'use strict';
    angular.module('mugs.app')
        .controller('MugListCtrl', function ($scope, Mugs) {
            $scope.mugs = Mugs.query();
        });
})();
