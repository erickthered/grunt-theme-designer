# Grunt Theme Designer

Author: Erick Rojas - Last updated: 2016-09-20

## About

Grunt theme designer is a set of grunt commands that facilitate the work of front-end theme developers and/or designers by providing:

1. Javascript files contatenation and minification
2. CSS files concatenation and minification
3. Sass compilation
4. PNG, JPEG and GIF optimization
5. Connect web server
6. Livereload

By default, this tool will provide support for jQuery, Bootstrap and Font Awesome, but you can *easily* add support to some other frameworks and tools.

## Installation

### Requirements

You'll need nodejs, npm and the following global packages installed:

* bower
* grunt-cli

If you need to install nodejs and npm, visit their website and download the installation files for your platform.

### Dependencies

Once you're sure you can run npm from the command line you'll need to install the project dependencies by running:

    npm install

Once you've done that, a new folder named node_modules will be available and (if everything went fine) you'll be able to start the server by running the followin command:

	grunt development


## Final Steps

### Bower Customization

You can modify the javascript/css dependencies by editing bower.json through the command line, for example in order to add momentjs support you would run something like:

	bower install --save moment

### Grunt Customization

If you need to use additional grunt tools, you can install 