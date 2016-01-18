var program = require('commander');
var packageFile = require('./package.json');

program.version(packageFile.version);

program
  .command('setup')
  .description('Command to setup BB8 With your Mac')
  .action(require('./commands/setup'));


