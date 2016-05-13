var sphero = require("sphero"),
    config = require('home-config').load('.bb8config');

module.exports = function() {

  if(typeof(config.BB8_UUID) !== 'undefined') {
    return sphero(config.BB8_UUID);
  }

  return false;
};

module.exports.config = config;
