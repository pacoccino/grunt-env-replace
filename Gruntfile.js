/*
 * grunt-env-replace
 * https://github.com/pakokrew/grunt-env-replace
 *
 * Copyright (c) 2015 Pacien Boisson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    env_replace: {
      preprod: {
        options: {
          destination: 1
        }
      },
      sprint: {
        options: {
          destination: 11
        }
      },
      prod: {
        options: {
          destination: 2
        }
      },
      test: {
        options: {
          destination: 1,
          folder: 'tmp/'
        }
      }
    },

    // Unit tests for lib.
    simplemocha: {
      options: {
        timeout: 500,
        ui: 'bdd',
        reporter: 'dot'
      },
      lib: { src: ['test/*_specs.js'] }
    },

    // copy fixtures for tests.
    copy: {
      tests: {
        src: ['test/fixtures/*'],
        dest: 'tmp/FrontV2',
        expand: true,
        flatten: true
      }
    },

    // Unit tests for tasks.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

// Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

// These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-prompt');

  grunt.registerTask('test', ['simplemocha', 'copy:tests', 'env_replace:test', 'nodeunit']);

// By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
