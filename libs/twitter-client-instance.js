var TwitterConfig = require('../config/twitter_keys'),
    Twitter = require('twitter');

module.exports = new Twitter({
    consumer_key: TwitterConfig.consumer_key,
    consumer_secret: TwitterConfig.consumer_secret,
    access_token_key: TwitterConfig.access_token_key,
    access_token_secret: TwitterConfig.access_token_secret
});