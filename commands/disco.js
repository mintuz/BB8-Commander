var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;

module.exports = function() {

    if(bb8) {

        bb8.connect(function() {

            console.log('Connected to - ' + config.BB8_LOCAL_NAME);

            setTimeout(function() {
                bb8.color("green");
            }, 1000);

            setTimeout(function() {
                bb8.color("blue");
            }, 2000);

            setTimeout(function() {
                bb8.color("red");
            }, 3000);

            setTimeout(function() {
                bb8.color("purple");
            }, 4000);

        });

    }

};
