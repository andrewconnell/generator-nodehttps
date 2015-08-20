'use strict';

var fs = require('fs');
var path = require('path');
var mockery = require('mockery');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

/**
 * Helper function to check contents of object.
 */
function assertObjectContains(obj, content) {
  Object.keys(content).forEach(function (key) {
    if (typeof content[key] === 'object') {
      assertObjectContains(content[key], obj[key]);
      return;
    }

    assert.equal(content[key], obj[key]);
  });
}

/**
 * Helper function to check contents of JSON file.
 */
function assertJSONFileContains(filename, content) {
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  assertObjectContains(obj, content);
}


/**
 * Tests for generator.
 */
describe('nodehttps:app', function () {

  before(function (done) {
    var generatorPromptResponses = {
      projName: 'Test Project Name',
      sslPort: 8443
    };

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(generatorPromptResponses)
      .on('end', done);
  });

  after(function () {    
    mockery.disable();
  });

  /**
   * Tests for server.js.
   */
  describe('server.js', function () {
    var serverJsCorrectPath = 'src/server/server.js';

    it('creates server.js in src/server', function (done) {
      assert.file(serverJsCorrectPath);
      done();
    });

    it('set port number in server.js', function (done) {
      assert.file(serverJsCorrectPath);
      assert.fileContent(serverJsCorrectPath, 'var PORT = 8443,');
      done();
    });
  });

  /**
   * Tests for package.json.
   */
  describe('package.json', function () {

    it('creates package.json in root', function (done) {
      assert.file('package.json');
      done();
    });

    it('sets correct values in package.json', function (done) {
      var exepctedValues = {
        name: 'test-project-name',
        description: 'HTTPS site using Express and Node.js',
        version: '0.1.0',
        main: 'src/server/server.js',
        dependencies: {
          express: '^4.12.2'
        }
      };

      assert.file('package.json');
      assertJSONFileContains('package.json', exepctedValues);

      done();
    });

  });

  /**
   * Test creation of static files in src/public/*.
   */  
  describe('static files created in src/public', function () {

    it('created public/index.html', function (done) {
      assert.file('src/public/index.html');
      done();
    });

    it('created public/content/site.css', function (done) {
      assert.file('src/public/content/site.css');
      done();
    });

  });

});