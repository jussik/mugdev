(function () {
    'use strict';
    angular.module('mugs.app')
        .controller('MugEditorCtrl', function ($scope, $routeParams, Mugs) {
            $scope.mug = Mugs.get({ id: $routeParams.id });
            $scope.mug.$promise.then(function (mug) {
                $scope.loading = false;
            })
        });
})();
