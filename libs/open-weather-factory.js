var request = require('request');

module.exports = function(config) {

  var accessToken = config.accessToken,
      locationCity = config.city,
      locationCountry = config.country,
      apiVersion = config.apiVersion || 2.5,
      units = config.units || 'metric',
      urlStringParts = 'http://api.openweathermap.org/data/';

  urlStringParts += apiVersion + '/',
  urlStringParts += 'weather?q=',
  urlStringParts += locationCity  + ',',
  urlStringParts += locationCountry + '&units=',
  urlStringParts += units + '&APPID=',
  urlStringParts += accessToken;

  return function(callback) {
    request(urlStringParts, function(error, response, body) {
      callback(error, JSON.parse(body));
    });
  };
};