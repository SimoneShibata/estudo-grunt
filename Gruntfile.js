module.exports = function (grunt) {

    grunt.initConfig({
        auto_install: {
            local: {}
        },
        copy: {
            bootstrap: {
                expand: true,
                cwd: 'bower_components/bootstrap/dist',
                src: ['**'],
                dest: 'html/dist/bootstrap'
            },
            jquery: {
                expand: true,
                cwd: 'bower_components/jquery/dist',
                src: ['**'],
                dest: 'html/dist/jquery'
            },
            jquery_maskmoney: {
                expand: true,
                cwd: 'bower_components/jquery-maskmoney/dist',
                src: ['**'],
                dest: 'html/dist/jquery-maskmoney'
            }
        },
        clean: ['html/dist/', 'sass/css/', 'sass/final/'],
        watch: {
            clean: {
                files: ['sass/*.scss'],
                tasks: ['clean', 'copy']
            },
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'sasslint', 'concat', 'cssmin']
            },
            css: {
                files: ['html/src/css/*.css'],
                tasks: ['csslint']
            },
            js: {
                files: ['html/src/js/*.js', 'Gruntfile.js'],
                tasks: ['jshint']
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'html/dist',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            all_js: {
                src: ['html/dist/jquery/jquery.js', 'html/dist/jquery-maskmoney/jquery.maskMoney.js', 'html/dist/bootstrap/js/bootstrap.js', 'html/src/*.js'],
                dest: 'html/dist/all-js.js'
            },
            all_css: {
                src: ['html/dist/**/*.css', 'sass/css/*.css'],
                dest: 'html/dist/all-css.css'
            }
        },
        cssmin: {
            all_css: {
                src: 'html/dist/all-css.css',
                dest: 'html/dist/all-css.min.css'
            }
        },
        bower: {
            install: {
                options: {
                    copy: false,
                    install: true,
                    verbose: false,
                    prune: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        uglify: {
            jsmin: {
                files: {
                    'html/dist/all-js.min.js': ['html/dist/all-js.js']
                }
            }
        },
        csslint: {
            validator: {
                options: {
                    import: 2
                },
                src: ['html/src/css/*.css']
            }
        },
        jshint: {
            validator: ['Gruntfile.js', 'html/src/js/*.js']
        },
        sasslint: {
            target: ['sass/*.scss']
        },
        complexity: {
            generic: {
                src: ['html/src/js/*.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'report.xml',
                    checkstyleXML: 'checkstyle.xml',
                    pmdXML: 'pmd.xml',
                    errorsOnly: false,
                    cyclomatic: [3, 7, 12],
                    halstead: [8, 13, 20],
                    maintainability: 100,
                    hideComplexFunctions: false,
                    broadcast: false
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'html/dist/index.min.html': 'html/src/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-auto-install');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['auto_install', 'clean', 'sass', 'copy', 'bower', 'concat', 'csslint', 'cssmin', 'uglify', 'htmlmin', 'csslint', 'jshint', 'sasslint', 'complexity', 'watch']);

};