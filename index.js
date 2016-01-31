var program = require('commander'),
    packageFile = require('./package.json'),
    executeCommand = require('./libs/execute-command');

program.version(packageFile.version);

// Utility Actions

program
    .command('setup')
    .description('Command to setup BB8 With your Mac')
    .action(require('./commands/setup'));

program
    .command('disconnect')
    .description('Command to disconnect from your BB8 Unit')
    .action(function () {
        executeCommand('disconnect');
    });

// Real Actions

program
    .command('disco')
    .description('Command to make your BB8 Unit A disco ball')
    .action(function () {
        executeCommand('disco');
    });

program
    .command('weather')
    .description('Command to get the weather colour from your BB8 Unit')
    .option('-c, --city <city>', 'City name such as manchester')
    .option('-cc, --country <country>', 'Country name such as uk')
    .option('-t, --access-token <accessToken>', 'API Key')
    .action(function(options) {
        executeCommand('weather', options);
    });

program
    .command('github')
    .description('Command to get notifications of new issues and PRs')
    .option('-t, --access-token <accessToken>', 'API Key')
    .action(require('github'));

program
    .command('roll')
    .description('BB8 will roll!')
    .action(function () {
        executeCommand('roll');
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
        executeCommand('tweet', options);
    });

program
  .command('express')
  .description('Command to setup express server')
  .option('-p, --port <port>', 'Port to run express on. Defaults to 3000')
  .action(function (options) {
      executeCommand('express', options);
  });

program
  .command('desk-buddy')
  .description('Command to keep you company whilst working at your desk. Place your BB8 in the charging station.')
  .action(function (options) {
      executeCommand('desk-buddy');
  });

program
  .command('power')
  .description('Command to get the power state of the BB-8')
  .action(function (options) {
    executeCommand('power');
  });

program
  .command('drive')
  .description('Command to accept keyboard input--use arrow keys')
  .action(function (options) {
    executeCommand('drive');
  });

try {
    program.parse(process.argv);
} catch (e) {
    console.error(e);
}
