var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;

module.exports = function() {

    if(bb8) {

        bb8.connect(function() {

            console.log('Connected to ' + config.BB8_LOCAL_NAME);

            bb8.randomColor();

            setInterval(function() {
                bb8.randomColor();
            }, 1000);

        });

    }

};
