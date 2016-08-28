var bb8 = require('./bb8-instance')(),
  appRootPath = require('app-root-path'),
  _ = require('lodash');

module.exports.connectAndSendCommand = function (command, options) {
  
  if (bb8) {
    bb8.connect(function () {
      require(appRootPath + '/commands/' + command)(bb8, options);
    });

    return;
  }

  console.log("BB8 Is not Connected");
};

module.exports.alreadyConnected = function (bb8, command) {

  if (bb8) {
    return require(appRootPath + '/commands/' + command)(bb8);
  }

  console.log("BB8 Is not Connected");
};

module.exports.alreadyConnectedSingleValue = function (bb8, command, options) {

  if (bb8) {
    return require(appRootPath + '/commands/' + command)(bb8, options);
  }

  console.log("BB8 Is not Connected");
};

module.exports.alreadyConnectedMultipleValues = function (bb8, command, options) {

  if (bb8) {
    return require(appRootPath + '/commands/' + command).apply(this, _.union([bb8], options));
  }

  console.log("BB8 Is not Connected");
};
