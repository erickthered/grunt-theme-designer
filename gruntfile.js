module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: 'src/components'
                }
            }
        },
        clean: {
            all: ['src/components', 'dist']
        },
        connect: {
            server: {
                options: {
                    // port: 8000,
                    hostname: '*',
                    base: 'dist',
                    livereload: true                }
            }
        },
        concat: {
            css: {
                options: {
                    separator: '\n'
                },
                src: ['src/components/bootstrap/dist/css/bootstrap.css', 'src/components/font-awesome/css/font-awesome.css', 'src/css/*.css'],
                dest: 'dist/css/all.css'
            },
            javascript: {
                options: {
                    separator: ';',
                },
                src: ['src/components/jquery/dist/jquery.js','src/components/bootstrap/dist/js/bootstrap.js','src/js/*.js'],
                dest: 'dist/js/all.js',
            },
            tests: {
                options: {
                    separator: ';',
                },
                src: ['src/components/mocha/mocha.js', 'node_modules/expect.js/index.js', 'src/tests/*.js'],
                dest: 'dist/js/tests.js'
            }
        },
        copy: {
            favicon: {
                expand: true,
                flatten: true,
                src: 'src/favicon.ico',
                dest: 'dist/'
            },
            html: {
                expand: true,
                flatten: true,
                src: 'src/*.html',
                dest: 'dist/'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: ['src/components/bootstrap/fonts/**', 'src/components/font-awesome/fonts/**'],
                dest: 'dist/fonts/',
                filter: 'isFile'
            },
            tests: {
                files: [
                    {expand: true, flatten: true, src: ['src/components/mocha/mocha.css'], dest: 'dist/css/', filter: 'isFile'},
                ]
            }
        },
        csslint: {
            all: {
                options: {
                    import: 2
                },
                src: ['src/css/*.css']
            }
        },
        cssmin: {
            all: {
                files: {
                    'dist/css/all.min.css': ['dist/css/all.css']
                }
            }
        },
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },
        jshint: {
            all: ['gruntfile.js', 'src/js/*.js']
        },
        mkdir: {
            all: {
                options: {
                    create: ['dist', 'dist/js', 'dist/css', 'dist/img', 'dist/fonts']
                },
            },
        },
        open: {
            dev: {
                path: 'http://localhost:8000/index.html'
            }
        },
        sass: {
            dist: {
                files: [{
                    cwd: 'src/scss/',
                    expand: true,
                    src: ['*.scss'],
                    dest: './src/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            all: {
                files: {
                    'dist/js/all.min.js': ['dist/js/all.js']
                }
            }
        },
        watch: {
            bower: {
                files: [
                    'bower.json'
                ],
                tasks: [
                    'bower'
                ],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: [ 'src/css/*.css', ],
                tasks: [ 'css' ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: [ 'src/*.html' ],
                tasks: [ 'copy:html' ],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            images: {
                files: [ 'src/img/**/*.{png,jpg,gif}'],
                tasks: [ 'imagemin' ],
                options: {
                    spawn: false
                }
            },
            js: {
                files: [ 'gruntfile.js', 'src/js/*.js' ],
                tasks: [ 'javascript' ],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            tests: {
                files: ['src/tests/*.js'],
                tasks: ['concat:tests', 'copy:tests'],
                options: {
                    spawn: false,
                }
            },
            sass: {
                files: [ 'src/scss/*.scss' ],
                tasks: [ 'sass', 'css' ],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
    });

    // grunt.initConfig({
    //     typescript: {
    //         base: {
    //             src: ['lib/**/*.ts'],
    //             dest: 'js/PixelVisionJSDemos.js',
    //             options: {
    //                 module: 'amd',
    //                 target: 'es5'
    //             }
    //         }
    //     },
    //     watch: {
    //         files: '**/*.ts',
    //         tasks: ['typescript']
    //     },
    // });

    grunt.registerTask('prepare', ['clean:all', 'mkdir', 'bower', 'javascript', 'css', 'sass', 'imagemin', 'copy', 'concat:tests']);
    grunt.registerTask('javascript', ['jshint', 'concat:javascript', 'uglify']);
    grunt.registerTask('css', ['csslint', 'concat:css', 'cssmin']);
    grunt.registerTask('serve', ['connect', 'open:dev']);
    grunt.registerTask('default', ['prepare']);

    grunt.registerTask('development', ['prepare', 'serve', 'watch']);
};