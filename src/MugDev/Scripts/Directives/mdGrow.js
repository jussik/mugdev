(function () {
    'use strict';
    angular.module('mugs.app')
        .directive('mdGrowTarget', function () {
            return {
                controller: function ($element) {
                    this.select = function () {
                        var orig = $element[0];
                        var rect = orig.getBoundingClientRect();
                        var elem = orig.cloneNode(true);
                        orig.parentElement.appendChild(elem);

                        var $elem = angular.element(elem);
                        $elem.css({
                            top: rect.top + 'px',
                            right: (window.innerWidth - rect.right) + 'px',
                            bottom: (window.innerHeight - rect.bottom) + 'px',
                            left: rect.left + 'px'
                        }).addClass('grow');

                        // trigger reflow
                        elem.offsetHeight;

                        $elem.css({
                            top: '-100px',
                            right: 0,
                            bottom: '-100px',
                            left: 0
                        })
                        .addClass('grow-active');
                    }
                }
            };
        })
        .directive('mdGrow', function ($location) {
            return {
                require: '^mdGrowTarget',
                link: function (scope, elem, attr, target) {
                    elem.on('click', function () {
                        target.select();
                    });
                }
            };
        });
})();
