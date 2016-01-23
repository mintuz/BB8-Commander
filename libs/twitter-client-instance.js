var Twitter = require('twitter');

module.exports = function(options) {

    var consumerKey = process.env.TWITTER_CONSUMER_KEY || options.consumerKey;
    var consumerSecret = process.env.TWITTER_CONSUMER_SECRET || options.consumerSecret;
    var accessTokenKey = process.env.TWITTER_ACCESS_TOKEN_KEY || options.accessTokenKey;
    var accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET || options.accessTokenSecret;

    return new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessTokenKey,
        access_token_secret: accessTokenSecret
    });
}