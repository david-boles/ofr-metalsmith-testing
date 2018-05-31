var debug = require('debug')('ofr-file_overrides');
var multimatch = require('multimatch');

function fileOverrides(files, metalsmith, done) {
  metalsmith.metadata().bundles.forEach((bundleID, index) => {
    debug('iterating through bundles', bundleID, index);

    multimatch(Object.keys(files), `${bundleID}/**`).forEach(path => {
      debug('iterating through files', path);

      var file = files[path];
      if(file.override) {
        debug('override specified');
      }

    });
    
  });

  done();
}

module.exports = () => {return fileOverrides}