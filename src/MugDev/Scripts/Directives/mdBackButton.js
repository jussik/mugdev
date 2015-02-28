(function () {
    'use strict';
    angular.module('mugs.app')
        .directive('mdBackButton', function ($location) {
            return function (scope, elem) {
                var isRoot = false;
                scope.$on('$routeChangeSuccess', function (ev, route) {
                    isRoot = route.originalPath === "/";
                    elem.toggleClass('fa-bars', isRoot).toggleClass('fa-angle-left', !isRoot);
                });

                elem.on('click', function () {
                    if (!isRoot) {
                        scope.$evalAsync(function () {
                            $location.url("/");
                        });
                    }
                });
            }
        });
})();
