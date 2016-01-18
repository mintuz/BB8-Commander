var sphero = require("sphero"),
    config require('home-config').load('.bb8config');

module.exports = function() {
  return sphero(config.BB8_UUID);
}