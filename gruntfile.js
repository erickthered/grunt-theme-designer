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
        connect: {
            server: {
                options: {
                    // port: 8000,
                    hostname: '*',
                    base: 'dist',
                    livereload: true                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8000/index.html'
            }
        },
        copy: {
            html: {
                src: 'src/index.html',
                dest: 'dist/index.html'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: ['src/components/bootstrap/fonts/**', 'src/components/font-awesome/fonts/**'],
                dest: 'dist/fonts/',
                filter: 'isFile'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'src/components'
                }
            }
        },
        jshint: {
            all: [
                'gruntfile.js',
                'src/js/*.js'
            ]
        },
        concat: {
            javascript: {
                options: {
                    separator: ';',
                },
                src: [
                    'src/components/jquery/dist/jquery.js',
                    'src/components/bootstrap/dist/js/bootstrap.js',
                    'src/js/*.js'
                ],
                dest: 'dist/js/all.js',
            },
            css: {
                options: {
                    separator: '\n'
                },
                src: [
                    'src/components/bootstrap/dist/css/bootstrap.css',
                    'src/components/font-awesome/css/font-awesome.css',
                    'src/css/*.css',
                ],
                dest: 'dist/css/all.css'
            }
        },
        cssmin: {
            all: {
                files: {
                    'dist/css/all.min.css': ['dist/css/all.css']
                }
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
        csslint: {
            all: {
                options: {
                    import: 2
                },
                src: ['src/css/*.css']
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
            js: {
                files: [
                    'gruntfile.js',
                    'src/js/*.js'
                ],
                tasks: [
                    'javascript'
                ],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            css: {
                files: [
                    'src/css/*.css',
                ],
                tasks: [
                    'css'
                ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: [
                    'src/*.html'
                ],
                tasks: [
                    'copy:html'
                ],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            images: {
                files: [
                    'src/img/**/*.{png,jpg,gif}'
                ],
                tasks: [
                    'imagemin'
                ],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: [
                    'src/scss/*.scss'
                ],
                tasks: [
                    'sass', 'css'
                ],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        mkdir: {
            all: {
                options: {
                    create: ['dist', 'dist/js', 'dist/css', 'dist/img', 'dist/fonts']
                },
            },
        },
        clean: {
            all: ['src/components', 'dist']
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
        }
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

    grunt.registerTask('prepare', ['clean:all', 'mkdir', 'bower', 'javascript', 'css', 'sass', 'imagemin', 'copy']);
    grunt.registerTask('javascript', ['jshint', 'concat:javascript', 'uglify']);
    grunt.registerTask('css', ['csslint', 'concat:css', 'cssmin']);
    grunt.registerTask('serve', ['connect', 'open:dev']);
    grunt.registerTask('default', ['prepare']);

    grunt.registerTask('development', ['prepare', 'serve', 'watch']);
};