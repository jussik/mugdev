(function () {
    'use strict';
    angular.module('mugs.utils', []);
    angular.module('mugs.app', ['mugs.utils', 'ngResource', 'ngRoute', 'ngAnimate'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/views/list.html',
                    controller: 'MugListCtrl'
                })
                .when('/edit/:id', {
                    templateUrl: '/views/edit.html',
                    controller: 'MugEditorCtrl'
                });

            $locationProvider.html5Mode(true);
        });
})();