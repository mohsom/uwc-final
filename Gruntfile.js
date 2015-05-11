module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'index.html'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'build/js/script.js': ['js/script.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'bower_components/**'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/styles/css/style.css': ['styles/css/style.css']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'build/img'
                }]
            }
        },

        clean: {
            build: ['build']
        },
        sass: {
            dist: {
                files: {
                    'styles/css/style.css': 'styles/sass/style.scss'
                }
            }
        },

        connect: {

            options: {
                port: 3000,
                hostname: 'localhost',
                livereload: 35719
            },

            livereload: {
                options: {
                    open: true
                }
            }
        },

        watch: {
            scss: {
                files: ['styles/sass/*.scss'],
                tasks: ['sass']
                //options:{
                //    livereload: '<%= connect.options.livereload %>',
                //}
            },
            css: {
                files: ['styles/css/*.css']
            },
            html: {
                files: ['index.html','catalogue.html','product-page.html']
                //tasks: ['validation']
            },
            js: {
                files: ['js/*.js', 'Gruntfile.js']
            },
            options: {
                //livereload: '<%= connect.options.livereload %>'
            },
            livereload: {
                files: [
                    'styles/css/*.css',
                    '<%=watch.html.files%>',
                    '<%=watch.js.files%>'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },
        validation: {
            files: {
                src: ['*.html']
            }
        },
        scsslint: {
            allFiles: [
                'styles/sass/*.scss'
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                reporterOutput: 'scss-lint-report.xml',
                colorizeOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', ['clean:build', 'sass', 'cssmin', 'htmlmin', 'imagemin','copy','uglify']);
    grunt.registerTask('serve', ['sass', 'connect', 'watch']);
    grunt.registerTask('valid', ['validation','scsslint']);
};
