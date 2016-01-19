var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;

module.exports = function() {

    if(bb8) {

        bb8.connect(function() {

            console.log('Connected to ' + config.BB8_LOCAL_NAME);
            console.log('Let\'s Roll!!');


            setInterval(function() {
                var direction = Math.floor(Math.random() * 360);
                bb8.roll(150, direction);
            }, 1000);

        });

    }

};



