var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;

module.exports = function() {

    if(bb8) {
        bb8.disconnect(function() {
            console.log('Disconnected from ' + config.BB8_LOCAL_NAME);
        });
    }

};
