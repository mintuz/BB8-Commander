var TwitterClient = require('../libs/twitter-client-instance');

function getLatestStatus(tweets) {
    return tweets.statuses[0];
}

module.exports = function (bb8, options) {
    var intervalDelay = options.delay || 10000,
        twitter = TwitterClient(options);

    console.log('Let\'s get tweets!');
    var executeTwitterCommand = function () {
        var hashTag = options.hashTag || 'bb8bbc';

        twitter.get('search/tweets', {q: hashTag}, function (error, tweets) {
            var latestStatus = getLatestStatus(tweets);
            var statusText = latestStatus.text;
            var firstCommand = statusText.split('#')[1];
            var user = latestStatus.user;

            console.log('This command was written by Hammond without tests. If your machine blows up, blame the lack of tests.')
            console.log('Twitter Command issued by: ', user.name + ' (' + user.screen_name + ')');
            console.log('Issued command: ', firstCommand);

            require('./' + firstCommand.trim())(bb8);
        });
    };

    executeTwitterCommand();

    setInterval(function () {
        executeTwitterCommand();
    }, intervalDelay);
};



