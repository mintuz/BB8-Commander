var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;
var WeatherFactory = require('../libs/open-weather-factory');

module.exports = function(options) {

    if(bb8 && (process.env.WEATHER_KEY || options.accessToken) {

        bb8.connect(function() {

            var weatherRequester = WeatherFactory({
                accessToken: options.accessToken || process.env.WEATHER_KEY,
                city: options.city || 'manchester',
                country: options.country || 'uk'
            });

            var WEATHER_ID = process.env.WEATHER_KEY;

            console.log('Connected to ' + config.BB8_LOCAL_NAME);
            console.log('Rain Rain go away, come back another day!');

            // Every 10 seconds, lets poll the weather
            setInterval(function() {

                weatherRequester(function (error, weatherData) {
                    
                    if(!error && weatherData) {

                        if(weatherData.main.temp >= 8) {

                            bb8.color('yellow');

                        } else if (weatherData.main.temp >= 20) {

                            bb8.color('orange');

                        } else if (weatherData.main.temp >= 25) {
                            
                            bb8.color('red');

                        } else {

                            bb8.color('blue');

                        }

                    }
                });

            }, 10000);

        });

    } else {
        console.log('BB8 Config isnt set or the WEATHER_KEY env for openweather is not present');
    }

};
