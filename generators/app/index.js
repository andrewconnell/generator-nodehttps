'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  /**
   * Setup the generator target source with common HTTP files.
   */
  templates: function(){
    this.composeWith('common',{});
  },
  
  init: function () {
    this.log(yosay(
      'Welcome to the Node.js HTTPS site generator!'
      ));
    
    // global configuration
    this.genConfig = {};
  },

  /**
   * Prompt for the name of the project.
   */
  askProjectName: function () {
    var done = this.async();

    var prompts = [{
      name: 'projName',
      message: 'What is the name of this project',
      default: 'ProjectName'
    }];

    this.prompt(prompts, function (props) {
      this.genConfig.projName = props.projName;
      done();
    }.bind(this));
  },

  /**
   * Get the SSL port the site will listen on.
   */
  askSslPort: function () {
    var done = this.async();

    var prompts = [{
      name: 'sslPort',
      message: 'What port will the site run on?',
      default: 8443
    }];

    this.prompt(prompts, function (props) {
      this.genConfig.sslPort = props.sslPort;
      done();
    }.bind(this));
  },

  /**
   * Write out files.
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
    site: function(){
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
  },

  /**
   * Execute NPM & Bower installs.
   */
  install: function () {
    var self = this;
    
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: false,
      callback: function () { 
        self.log(yosay('All done, but there\'s work for you to do...'));
        
        console.log('  You need to update the server.js file to reference the your SSL key and');
        console.log('    certificate, the private/public pair that is used to serve the site as HTTPS.');
        console.log('  Refer to this for more information: ' + chalk.blue('https://www.github.com/andrewconnell/generator-nodehttps/docs/setup-https.md'));
        console.log('');
      }
    });
    
  }
});
