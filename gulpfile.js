'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var inspector = require('gulp-node-inspector');
var which = require('which');
var path = require('path');
var mocha = require('gulp-mocha');
/**
 * Setup node inspector to debug app.
 */
gulp.task('node-inspector', function () {
  // start node inspector
  return gulp.src([])
    .pipe(inspector({
      debugPort: 5858,
      webHost: '127.0.0.1',
      webPort: 8080
    }));
});

/**
 * Run the Yeoman generator in debug mode.
 */
gulp.task('run-yo', function () {
  spawn('node', [
    '--debug',
    path.join(which.sync('yo'), '../../', 'lib/node_modules/yo/lib/cli.js'),
    'nodehttps'], { stdio: 'inherit' });
});

gulp.task('debug-yo', ['run-yo', 'node-inspector']);

/**
 * Execute all tests.
 */
gulp.task('run-tests', function () {
  return gulp.src('test/**/*.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

/* default gulp task */
gulp.task('default', ['node-inspector']);