'use strict';

var grunt = require('grunt');


var files = [
  'index.html'
];

exports.geode_environment = {
  setUp: function(done) {

    done();
  },
  default_options: function(test) {
    test.expect(files.length);

    for(var i=0; i<files.length; i++) {

      var actual = grunt.file.read('tmp/'+files[i]);
      var expected = grunt.file.read('test/expected/'+files[i]);
      test.equal(actual, expected, files[i] + ' is not correctly replaced.');
    }

    test.done();
  },
  delete: function(test) {

    grunt.file.delete('tmp');

    test.done();
  }
};
