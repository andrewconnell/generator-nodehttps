'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {

    generators.Base.apply(this, arguments);

    this.option('skip-install', {
      type: Boolean,
      desc: 'Skip running package managers (NPM, bower, etc) post scaffolding',
      required: false,
      defaults: false
    });

  },
  
  /**
   * Generator initalization
   */
  initializing: function () {
    this.log(yosay(
      'Welcome to the Node.js HTTPS site generator!'
      ));

    // global configuration
    this.genConfig = {};
  },

  /**
   * Prompt users for options
   */
  prompting: {

    askFor: function () {
      var done = this.async();

      var prompts = [{
        name: 'projName',
        message: 'What is the name of this project',
        default: 'ProjectName'
      }, {
          name: 'sslPort',
          message: 'What port will the site run on?',
          default: 8443
        }];

      this.prompt(prompts, function (props) {
        this.genConfig.projName = props.projName.toLowerCase().replace(/ /g, "-");;
        this.genConfig.sslPort = props.sslPort;
        done();
      }.bind(this));

    } // askFor()
    
  }, // prompting()

  /**
   * write generator specific files
   */
  writing: {
    // copy project files over
    app: function () {
      this.fs.copyTpl(
        this.templatePath('src/_package.json'),
        this.destinationPath('package.json'),
        this.genConfig
        );
    },
    
    // copy static site
    site: function () {
      this.fs.copyTpl(
        this.templatePath('src/server/server.js'),
        this.destinationPath('src/server/server.js'),
        this.genConfig
        );
      this.fs.copyTpl(
        this.templatePath('src/public/index.html'),
        this.destinationPath('src/public/index.html'),
        this.genConfig
        );
      this.fs.copyTpl(
        this.templatePath('src/public/content/site.css'),
        this.destinationPath('src/public/content/site.css'),
        this.genConfig
        );
    }
  }, // writing()
  
  /**
   * conflict resolution
   */
  // conflicts: { }, 

  /**
   * run installations (bower, npm, tsd, etc)
   */
  install: function () {
    this.npmInstall();
  }, // install()

  /**
   * last cleanup, goodbye, etc
   */
  end: function () {
    this.log(yosay('All done, but there\'s work for you to do...'));

    this.log('  You need to update the server.js file to reference the your SSL key and');
    this.log('    certificate, the private/public pair that is used to serve the site as HTTPS.');
    this.log('  Refer to this for more information: ' + chalk.blue('https://www.github.com/andrewconnell/generator-nodehttps/docs/setup-https.md'));
    this.log('');
  }

});
