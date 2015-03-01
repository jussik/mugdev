(function () {
    'use strict';
    angular.module('mugs.app')
        .directive('mugEditorCanvas', function () {
            return {
                scope: { mug: '=mugEditorCanvas' },
                link: function (scope, elem) {
                    var canvas = elem[0];
                    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
                    renderer.setClearColor(0, 0);

                    var scene = new THREE.Scene();

                    var light = new THREE.DirectionalLight(0xffffff, 1);
                    light.position.set(3, 10, 5);
                    scene.add(light);

                    var width, height, camera;
                    function resize() {
                        width = window.innerWidth;
                        height = window.innerHeight - 48;
                        renderer.setSize(width, height);

                        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
                        camera.position.set(120, 100, 180);
                        camera.up = new THREE.Vector3(0, 1, 0);
                        camera.lookAt(new THREE.Vector3(0, 0, 0));

                        render();
                    }

                    function render() {
                        requestAnimationFrame(function () {
                            renderer.render(scene, camera);
                        });
                    }

                    resize();

                    elem.on('$destroy', function () {
                        angular.element(window).off('resize', resize);
                    })
                    angular.element(window).on('resize', resize);

                    var mesh = null;
                    scope.$watchGroup(['mug.height', 'mug.radius', 'mug.shape'], function () {
                        var mug
                        if (!(mug = scope.mug) || !mug.$resolved)
                            return;
                        if (mesh != null)
                            scene.remove(mesh);

                        var geometry = mug.shape === 1
                            ? new THREE.CylinderGeometry(mug.radius, mug.radius, mug.height, 20, 1)
                            : new THREE.BoxGeometry(mug.radius * 2, mug.height, mug.radius * 2);
                        var material = new THREE.MeshPhongMaterial({
                            ambient: 0xffffff,
                            color: 0x9d9d9d,
                            specular: 0x161616,
                            shininess: 30,
                            shading: THREE.FlatShading
                        });
                        mesh = new THREE.Mesh(geometry, material);
                        scene.add(mesh);

                        render();
                    });
                }
            };
        });
})();
