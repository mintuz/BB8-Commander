var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;

module.exports = function() {

  console.log('connected to - ' + config.BB8_UUID);
  
  if(bb8) {
    bb8.connect(function() {
      
      console.log('connected to - ' + config.BB8_UUID);
      
      bb8.color("green");
    });
  }
  
};