module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.initConfig({
        clean: ['wwwroot/js', 'wwwroot/css', 'Build'],
        concat: {
            default: {
                options: { sourceMap: true },
                files: { 'wwwroot/js/app.js': ['Scripts/app.js', 'Scripts/**/*.js'] }
            }
        },
        ngAnnotate: {
            default: {
                files: { 'Build/js/app.annotated.js': ['Scripts/app.js', 'Scripts/**/*.js'] }
            }
        },
        uglify: {
            default: {
                options: { screwIE8: true },
                files: { 'wwwroot/js/app.js': ['Build/js/app.annotated.js'] }
            }
        },
        less: {
            release: {
                options: { compress: true, ieCompat: false },
                files: { 'wwwroot/css/app.css': 'Styles/app.less' }
            },
            debug: {
                options: { sourceMap: true, outputSourceFiles: true, sourceMapURL: 'app.css.map', sourceMapRootpath: '../', ieCompat: false },
                files: { 'wwwroot/css/app.css': 'Styles/app.less' }
            }
        },
        watch: {
            concat: {
                files: ['Scripts/**/*.js'],
                tasks: ['concat']
            },
            annotate: {
                files: ['Scripts/**/*.js'],
                tasks: ['ngAnnotate']
            },
            uglify: {
                files: ['Build/js/app.annotated.js'],
                tasks: ['uglify']
            },
            lessRelease: {
                files: ['Styles/**.less'],
                tasks: ['less:release']
            },
            lessDebug: {
                files: ['Styles/**.less'],
                tasks: ['less:debug']
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            release: {
                tasks: ["watch:annotate", "watch:lessRelease"]
            },
            debug: {
                tasks: ["watch:concat", "watch:lessDebug"]
            }
        }
    });

    grunt.registerTask('release', ['clean', 'ngAnnotate', 'uglify', 'less:release', 'concurrent:release']);
    grunt.registerTask('debug', ['clean', 'concat', 'less:debug', 'concurrent:debug']);
};
