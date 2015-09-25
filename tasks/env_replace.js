var Helper = require('../tasks/lib/helper');
var gr_tx_rep = require('grunt-text-replace/tasks/text-replace');
var gr_prompt = require('grunt-prompt/tasks/prompt');

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('env_replace', 'Automatisation de configuration d\'environnement', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: '/',
      folder: ''
    });

    if(options.destination < 1) {
      grunt.fail.warn("Destination cannot be dev");
    }
    else {
      options.source = options.destination < 10 ? (options.destination-1) : (options.destination-11);
    }

    var replaceConfig = {
      html: {
        src: [options.folder + options.separator + '*.html'],
        overwrite: true,
        replacements: [{
          from: Helper.getRegex(Helper.StaticUrl),
          to: Helper.getEnvUrl(Helper.StaticUrl, options.destination)
        }]
      }
    };

    var promptConfig = {
      target: {
        options: {
          questions: [{
            config: 'env',
            type: 'list',
            message: 'Please choose destination environment :',
            default: 'preprod',
            choices: [
              {
                name: 'dev -> preprod',
                value: Helper.ENV.PREPROD
              },
              {
                name: 'dev -> sprint',
                value: Helper.ENV.SPRINT
              },
              {
                name: 'preprod -> prod',
                value: Helper.ENV.PROD
              }
            ]
          }],
          then : function(){
            options.destination = grunt.config('env');
          }
        }
      }
    };

    var tasks = [];
    if(!options["destination"]) {
      tasks.push('prompt');
      grunt.config('prompt', promptConfig);
      gr_prompt(grunt);
    }

    var replaceTaskName = 'replace';

    // Renaming existing replace tasks for solving conflicts
    if(grunt.task.exists('replace')) {

      replaceTaskName = 'myReplace';
      var tmpTaskName = 'tmpTaskName';

      grunt.renameTask('replace', tmpTaskName);

      gr_tx_rep(grunt);

      grunt.renameTask('replace', replaceTaskName);
      grunt.renameTask(tmpTaskName, 'replace');
    }
    else {

      gr_tx_rep(grunt);
    }


    tasks.push(replaceTaskName);
    grunt.config(replaceTaskName, replaceConfig);

    grunt.task.run(tasks);

  });

};
