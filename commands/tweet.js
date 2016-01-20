var TwitterClient = require('../libs/twitter-client-instance');

function getUsersName(user) {
    return user.name;
}

function screenName(user) {
    return user.screen_name;
}

function getLatestStatus(tweets) {
    return tweets.statuses[0];
}

function getUser(status) {
    return status.user;
}

module.exports = function (bb8) {
    console.log('Let\'s Get Tweets!!');

    var executeTwitterCommand = function () {
        TwitterClient.get('search/tweets', {q: 'bb8bbc'}, function (error, tweets) {
            var latestStatus = getLatestStatus(tweets);
            var statusText = latestStatus.text;
            var firstCommand = statusText.split('#')[1];
            var user = getUser(latestStatus);

            console.log('This command was written by Hammond without tests. If your machine blows up, blame the lack of tests.')
            console.log('Twitter Command issued by: ', getUsersName(user) + ' (' + screenName(user) + ')');
            console.log('Issued command: ', firstCommand);

            require('./' + firstCommand.trim())(bb8);
        });
    };

    executeTwitterCommand();

    setInterval(function () {
        executeTwitterCommand();
    }, 10000);
};



