//Package imports
var metalsmith = require('metalsmith');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var livereload = require('metalsmith-livereload');
var fs = require('fs');
var jsYAML = require('js-yaml');
var metafiles = require('metalsmith-metafiles');

//Local imports
var utils = require('./src/utils');
var overrides = require('./src/overrides');
var indexTerms = require('./src/index_terms');

module.exports.build = function build(devBuild) {
  console.log('Building...');
  var startTime = new Date();
  
  //Initial metalsmith setup
  var ms = metalsmith(__dirname)
  .source('bundles')
  .destination('build')
  .clean(true)

  .metadata(utils.getInitialMetadata(devBuild))
  .use(metafiles({
    parsers: {
      ".yml": true,
      ".yaml": true
    }
  }))
  .use(overrides)
  .use(indexTerms)

  .use(utils.printMetadata)
  // .use(utils.printFiles)
  
  //Apply plugins for live development builds
  if(devBuild) {
    console.log('Starting dev environment...');
    ms
      .use(livereload())
      .use(watch({
        paths: {
          "**/*": "**/*"
        }
      }))
      .use(serve());
  }

  //Start build
  ms.build(function(err) {
    if(err) throw err;
    else console.log('Done! Took ' + utils.getBuildDurationString(startTime) + '.\n');
  });
}

