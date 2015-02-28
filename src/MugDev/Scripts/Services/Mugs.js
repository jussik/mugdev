(function () {
    'use strict';
    angular.module('mugs.app')
        .factory('Mugs', function ($resource) {
            return $resource('/api/mugs/:id');
        });
})();
