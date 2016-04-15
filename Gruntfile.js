'use strict';

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    // Load Grunt modules
    require('load-grunt-tasks')(grunt);


    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            'root': 'middleman',
            'src': '<%= config.root %>/source',
            'dist': '<%= config.root %>/build',
            'styles_src': '<%= config.src %>/assets/stylesheets/sass',
            'styles_dist': '<%= config.dist %>/assets/stylesheets',
            'js_src': '<%= config.src %>/assets/javascripts',
            'js_dist': '<%= config.dist %>/assets/javascripts'
        },


        watch : {
            options : {
                livereload : true
            },
            middleman: {
                files: [ 
                    '<%= config.src %>/**/*',
                    '!<%= config.styles_src %>/**/*',
                    '!<%= config.js_src %>/**/*',
                    '!<%= config.src %>/*.rb',
                    '!<%= config.src %>/Gemfile*.rb'
                ],
                tasks: [ 'middleman:build' ]
            },
            sass: {
                files: ['<%= config.styles_src %>/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            scripts: {
                files: ['<%= config.js_src %>/**/*.js'],
                tasks: [ 'concat' ]
            }
        },


        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= config.styles_dist %>/app.css':'<%= config.styles_src %>/app.scss'
                }
            }
        },


        autoprefixer: {
            options: {
                map: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.styles_dist %>',
                        src: ['**/*.css'],
                        dest: '<%= config.styles_dist %>',
                        ext: '.css'
                    },
                ]
            },
        },


        cssmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.styles_dist %>',
                        src: ['*.css', '!*.min.css'],
                        dest: '<%= config.styles_dist %>',
                        ext: '.min.css'
                    }
                ]
            }
        },


        concat: {
            options: {
                separator: ';\n',
                stripBanners: true
            },
            dist: {
                src: [
                    '<%= config.js_src %>/**/*.js'
                ],
                dest: '<%= config.js_dist %>/master.js'
            },
        },


        middleman: {
            options: {
                useBundle: false,
                cwd: "<%= config.root %>"
            },
            server: {},
            build: {
                options: {
                    verbose: true,
                    command: "build"
                }
            }
        },


        clean: {
            build: {
                src: ['<%= config.dist %>']
            }
        },


        connect: {
            server: {
                options: {
                    port: 4567,
                    livereload: true,
                    base: '<%= config.dist %>',
                }
            }
        }

    });


    // Default task(s).
    grunt.registerTask('default', 'default task', function() {
        grunt.log.writeln('');
        grunt.log.writeln('USAGE');
        grunt.log.writeln('-----');
        grunt.log.writeln('To serve the site at localhost:4567 and watch for changes:');
        grunt.log.writeln('grunt app-serve');
        grunt.log.writeln('');
        grunt.log.writeln('To create the build:');
        grunt.log.writeln('grunt app-build');
    });


    /**
     * Serves the site and watches for changes.
     */
    grunt.registerTask('app-serve', [
        'app-build',
        'connect',
        'watch'
    ]);


    /**
     * Builds the site and creates static files in `build` folder.
     */
    grunt.registerTask('app-build', [
        'clean',
        'middleman:build',
        'sass',
        'autoprefixer',
        'cssmin',
        'concat'
    ]);


};