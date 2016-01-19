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

    TwitterClient.get('search/tweets', {q: 'bb8bbc'}, function (error, tweets) {
        var statusText = tweets.statuses[0].text;
        var command = statusText.split('#')[1];
        var latestStatus = getLatestStatus(tweets);
        var user = getUser(latestStatus);

        console.log('This command was written by Hammond without tests. If your machine blows up, blame the lack of tests.')
        console.log('Twitter Command issued by: ', getUsersName(user) + ' (' + screenName(user) + ')');
        console.log('Issued command: ', command);

        require('./' + command.trim())(bb8);
    });
};



