module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
            dist: ['dist']
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'test/results.log', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        },
            
        copy: {
            dist: {
                files: [
                    {'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js'}
                ]
            }
        },       
 
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['mochaTest']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'jshint', 'copy', 'uglify']);

    // Default task(s).
    grunt.registerTask('default', ['dist']);
};
