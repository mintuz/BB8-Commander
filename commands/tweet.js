var bb8 = require('../libs/bb8-instance')();
var config = require('../libs/bb8-instance').config;
var TwitterClient = require('../libs/twitter-client-instance');

module.exports = function () {


    //if(bb8) {
    //    bb8.connect(function() {

    console.log('Connected to ' + config.BB8_LOCAL_NAME);
    console.log('Let\'s Get Tweets!!');
    TwitterClient.get('search/tweets', {q: 'bb8bbc'}, function (error, tweets, response) {
        var statusText = tweets.statuses[0].text;
        var command = statusText.split('#')[1];
        console.log(tweets);
        console.log(tweets.statuses[1].user);
        //console.log(tweets.statuses[1].)
        console.log('This command was written by Hammond without tests. If your machine blows up, blame the lack of tests.')
        console.log('the command is: ', command);

        getCommand(command)();
    });

    //    });
    //}

    function getCommand(command) {
        return {
            disco: disco
        }[command.trim()]
    }

    function disco() {
        console.log('running disco!');
        //bb8.randomColor();
        //
        //setInterval(function () {
        //    bb8.randomColor();
        //}, 1000);
    }

    //if(bb8) {
    //
    //    bb8.connect(function() {
    //
    //        console.log('Connected to ' + config.BB8_LOCAL_NAME);
    //        console.log('Let\'s Roll!!');
    //
    //
    //        setInterval(function() {
    //            var direction = Math.floor(Math.random() * 360);
    //            bb8.roll(150, direction);
    //        }, 1000);
    //
    //    });
    //
    //}

};



