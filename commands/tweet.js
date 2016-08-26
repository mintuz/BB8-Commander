var TwitterClient = require('../libs/twitter-client-instance'),
    _ = require('lodash'),
    alreadyTriggeredTweets = {};

function getLatestStatus(tweets) {

    if(tweets && !tweets.errors) {

        var latestTweet = tweets.statuses[0];

        if(alreadyTriggeredTweets[latestTweet.id_str]) {
            return false;
        }

        alreadyTriggeredTweets[latestTweet.id_str] = true;

        return tweets.statuses[0];
    }

    return false;

}

var executeTwitterCommand = function (bb8, options) {

    var twitter = TwitterClient(options),
        hashTag = options.hashTag || 'bb8code';

    twitter.get('search/tweets', {q: hashTag}, function (error, tweets) {
        
        var latestStatus = getLatestStatus(tweets);

        if(latestStatus) {

            var command = _.trim(_.replace(_.replace(latestStatus.text, /#/g, ''), hashTag, '')),
                user = latestStatus.user;

            console.log('Twitter Command issued by: ', user.name + ' (' + user.screen_name + ')');
            console.log('Issued command: ', command);

            require('./' + command)(bb8);
        }
    });
};

module.exports = function (bb8, options) {
    var intervalDelay = options.delay || 10000;

    console.log('Let\'s get tweets!');

    var commanderExecuter = _.partial(executeTwitterCommand, bb8, options);

    commanderExecuter();

    return setInterval(function () {
        commanderExecuter();
    }, intervalDelay);
};



