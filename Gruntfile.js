module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({

        less: {
            build: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    'css/main.css': 'less/__main.less'
                }
            }
        },
        jshint: {
            bootstrap: {
                options: {
                    asi: true,
                    expr: true,
                    laxbreak: true,
                    eqnull: true
                },
                src: 'js/bootstrap/*.js'
            },
            main: {
                src: ['Gruntfile.js', 'js/plugins.js']
            }
        },
        concat: {
            bootstrap: {
                src: [
                    'js/plugins.js',
                    'js/bootstrap/transition.js',
                    'js/bootstrap/alert.js',
                    'js/bootstrap/button.js',
                    'js/bootstrap/carousel.js',
                    'js/bootstrap/collapse.js',
                    'js/bootstrap/dropdown.js',
                    'js/bootstrap/modal.js',
                    'js/bootstrap/tooltip.js',
                    'js/bootstrap/popover.js',
                    'js/bootstrap/scrollspy.js',
                    'js/bootstrap/tab.js',
                    'js/bootstrap/affix.js'
                ],
                dest: 'js/main.js'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            bootstrap: {
                src: 'js/main.js',
                dest: 'js/main.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['less','jshint','concat','uglify']);
};