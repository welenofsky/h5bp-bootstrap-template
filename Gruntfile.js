module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        copy: {
            bootstrap_csslint: {
                expand: true,
                src: [
                    '.csslintrc',
                    '.csscomb.json'
                ],
                cwd: 'bower_components/bootstrap/less/',
                dest: 'less/',
            },
            bootstrap_jslint: {
                expand: true,
                src: [
                    '.jscsrc',
                    '.jshintrc',
                ],
                cwd: 'bower_components/bootstrap/js/',
                dest: 'js/'
            },
            fonts: {
                expand: true,
                cwd: 'bower_components/fontawesome/fonts/',
                src: ['**'],
                dest: 'fonts/',
            },
            jquery: {
                nonull: true,
                src: 'bower_components/jquery/dist/jquery.min.js',
                dest: 'js/vendor/jquery.min.js'
            }
        },
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
        concat: {
            bootstrap_js: {
                src: [
                    'js/plugins.js',
                    'bower_components/bootstrap/js/transition.js',
                    'bower_components/bootstrap/js/alert.js',
                    'bower_components/bootstrap/js/button.js',
                    'bower_components/bootstrap/js/carousel.js',
                    'bower_components/bootstrap/js/collapse.js',
                    'bower_components/bootstrap/js/dropdown.js',
                    'bower_components/bootstrap/js/modal.js',
                    'bower_components/bootstrap/js/tooltip.js',
                    'bower_components/bootstrap/js/popover.js',
                    'bower_components/bootstrap/js/scrollspy.js',
                    'bower_components/bootstrap/js/tab.js',
                    'bower_components/bootstrap/js/affix.js'
                ],
                dest: 'js/main.js'
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
                src: 'bower_components/bootstrap/js/*.js'
            },
            main: {
                src: ['Gruntfile.js', 'js/plugins.js']
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['copy', 'less','concat','jshint','uglify']);
};