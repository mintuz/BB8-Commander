var bb8 = require('./bb8-instance')(),
    appRootPath = require('app-root-path'),
    _ = require('lodash');

module.exports = function (command, options) {
  if (bb8) {
    bb8.connect(function () {
      require(appRootPath + '/commands/' + command)(bb8, options);
    });
  }
};

module.exports.alreadyConnected = function(bb8, command) {
  if (bb8) {
    require(appRootPath + '/commands/' + command)(bb8);  
  }
}

module.exports.alreadyConnectedSingleValue = function(bb8, command, options) {
  if (bb8) {
    require(appRootPath + '/commands/' + command)(bb8, options);  
  }
};

module.exports.alreadyConnectedMultipleValues = function(bb8, command, options) {
  
  if (bb8) {
    var parameters = _.union([bb8], options);
    require(appRootPath + '/commands/' + command).apply(this, parameters);  
  }

};