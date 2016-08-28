module.exports.setup = require('./commands/setup');
module.exports.executeCommand = require('./libs/execute-command').connectAndSendCommand;
module.exports.executeCustomCommand = require('./libs/executeCommand').connectAndSendCustomCommand;