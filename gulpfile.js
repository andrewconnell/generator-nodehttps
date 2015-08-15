'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var inspector = require('gulp-node-inspector');

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
    '/Users/ac/.npm-packages/lib/node_modules/yo/lib/cli.js',
    'nodehttps'], { stdio: 'inherit' });
});

gulp.task('debug-yo', ['run-yo', 'node-inspector']);

/* default gulp task */
gulp.task('default', ['node-inspector']);