var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;
var weather = require("Openweather-Node");

module.exports = function(options) {

    if(bb8 && process.env.WEATHER_KEY) {

        bb8.connect(function() {

            weather.setAPPID(process.env.WEATHER_KEY);
            weather.setCulture("fr");
            weather.setForecastType("daily");

            var location = options.location || 'Manchester, UK';

            console.log('Connected to ' + config.BB8_LOCAL_NAME);

            // Every 10 seconds, lets poll the weather
            setInterval(function() {

                weather.now(location, function(err, data){
                    console.log(data);
                });

            }, 10000);

        });

    } else {
        console.log('BB8 Config isnt set or the WEATHER_KEY env for openweather is not present');
    }

};
