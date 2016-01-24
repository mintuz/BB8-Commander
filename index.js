var program = require('commander');
var packageFile = require('./package.json');
var bb8 = require('./libs/bb8-instance')();
var config = require('./libs/bb8-instance').config;

var executeCommand = function (command, options) {
    if (bb8) {
        bb8.connect(function () {
            require(command)(bb8, options)
        });
    }
};

program.version(packageFile.version);

// Utility Actions

program
    .command('setup')
    .description('Command to setup BB8 With your Mac')
    .action(require('./commands/setup'));

program
    .command('disconnect')
    .description('Command to disconnect from your BB8 Unit')
    .action(function (options) {
        executeCommand('./commands/disconnect', options);
    });

// Real Actions

program
    .command('disco')
    .description('Command to make your BB8 Unit A disco ball')
    .action(function () {
        executeCommand('./commands/disco');
    });

program
    .command('weather')
    .description('Command to get the weather colour from your BB8 Unit')
    .option('-c, --city <city>', 'City name such as manchester')
    .option('-cc, --country <country>', 'Country name such as uk')
    .option('-t, --access-token <accessToken>', 'API Key')
    .action(function(options) {
        executeCommand('./commands/weather', options);
    });

program
    .command('github')
    .description('Command to get notifications of new issues and PRs')
    .option('-t, --access-token <accessToken>', 'API Key')
    .action(require('./commands/github'));

program
    .command('roll')
    .description('BB8 will roll!')
    .action(function () {
        executeCommand('./commands/roll');
    });


program
    .command('tweet')
    .description('BB8 will respond to tweets!')
    .option('-#, --hash-tag <hashTag>', 'Hashtag to search for. Defaults to "#bb8bbc"')
    .option('-d, --delay <delay>', 'Interval delay for retrieving new tweets. Defaults to 10000')
    .option('--consumer-key <consumerKey>', 'Twitter api consumer key')
    .option('--consumer-secret <consumerSecret>', 'Twitter api consumer secret')
    .option('--access-token-key <accessTokenKey>', 'Twitter api access token key')
    .option('--access-token-secret <accessTokenSecret>', 'Twitter api access token secret')
    .action(function (options) {
        executeCommand('./commands/tweet', options)
    });

program
  .command('express')
  .description('Command to setup express server')
  .action(require('./commands/express'));

try {
    program.parse(process.argv);
} catch (e) {
    console.error(e);
}
