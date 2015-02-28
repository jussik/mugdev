(function () {
    'use strict';
    angular.module('mugs.app')
        .factory('Mugs', function ($resource) {
            return $resource('/api/mugs', {}, {
                query: { isArray: true }
            });
        });
})();
