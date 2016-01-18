var program = require('commander');
var packageFile = require('./package.json');

program.version(packageFile.version);

program
  .command('setup')
  .description('Command to setup BB8 With your Mac')
  .action(require('./commands/setup'));

program
  .command('disco')
  .description('Command to make BB8 A disco ball')
  .action(require('./commands/disco'));

try {
  program.parse(process.argv);
} catch (e) {
  console.error(e);
}
