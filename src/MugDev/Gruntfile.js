module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        ngAnnotate: {
            mugs: {
                files: {
                    'Build/js/app.annotated.js': ['Scripts/app.js', 'Scripts/**/*.js']
                }
            }
        },
        uglify: {
            mugs: {
                files: { 'wwwroot/js/app.js': ['Build/js/app.annotated.js'] }
            }
        },
        less: {
            styles: {
                files: { 'wwwroot/css/app.css': ['Styles/**.less'] }
            }
        },
        watch: {
            annotate: {
                files: ['Scripts/**/*.js'],
                tasks: ['ngAnnotate']
            },
            uglify: {
                files: ['Build/js/app.annotated.js'],
                tasks: ['uglify']
            },
            less: {
                files: ['Styles/**.less'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('default', ['ngAnnotate', 'uglify', 'less', 'watch']);
};