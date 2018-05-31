var debug = require('debug')('ofr-validate_bundles');
var multimatch = require('multimatch');

function validateBundles(files, metalsmith, done) {
  var initialPaths = Object.keys(files)
  debug('initial paths', initialPaths);

  var bundlePatterns = metalsmith.metadata().bundles.map(bundle => `${bundle}/**`);
  debug('bundle patterns', bundlePatterns);

  var allBundlesHaveFiles = true;
  bundlePatterns.forEach(pattern => {
    var matches = multimatch(initialPaths, pattern);
    debug(`${pattern}'s matches`, matches)
    if(matches.length == 0) {
      allBundlesHaveFiles = false;
    }
  });
  debug('all bundles have files', allBundlesHaveFiles);

  if(allBundlesHaveFiles) {
    var negatedBundlePatterns = bundlePatterns.map(pattern => `!${pattern}`);
    debug('negated bundle patterns', negatedBundlePatterns);
  
    var pathsNotInBundles = multimatch(initialPaths, ['**'].concat(negatedBundlePatterns));
    debug('paths not in bundles', pathsNotInBundles);

    pathsNotInBundles.forEach(path => {
      console.warn(`[WARNING] The file \`${path}\` is not in a specified bundle, it will be removed from the build.`);
      delete files[path];
    });
    debug('final paths', Object.keys(files));

    done();
  }else {
    console.error('[ERROR] No files found in a specified bundle. Double check config.yml and that all submodules have been set properly.');
    process.exitCode = 1;
  }
}

module.exports = ()=>{return validateBundles};