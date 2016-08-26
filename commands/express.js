var bb8 = require('../libs/bb8-instance')(),
    config = require('../libs/bb8-instance').config,
    expressInstance = require('../libs/express'),
    executeCustomCommand = require('../libs/execute-command'),
    _ = require('lodash'),
    runningCommandIds = [];

var callbackFactory = function (res) {
    return function (err, data) {
        if (!err) {
            res.send({ data: data });
        } else {
            res.send({ error: err });
        }
    };
};

var stopCustomCommands = function () {

    var commandsStopped = [];

    runningCommandIds.forEach(function (commandObj) {
        clearInterval(commandObj.commandRunningId);
        commandsStopped.push(commandObj.commandName);
    });

    runningCommandIds = [];
    return commandsStopped;
};

var spheroCommandExecuter = function (bb8, requestBody, res) {

    if (_.isString(requestBody.value)) {
        bb8[requestBody.command](requestBody.value, callbackFactory(res));
    } else if (_.isArray(requestBody.value)) {
        requestBody.value.push(callbackFactory(res));
        bb8[requestBody.command].apply(this, requestBody.value);
    } else {
        bb8[requestBody.command](callbackFactory(res));
    }
};

var customCommandExecuter = function (bb8, requestBody, res) {

    var commandId;
    var commandName = requestBody.command;
    var commandValue = requestBody.value;

    if (commandName === 'stop') {
        var stoppedCommandsArray = stopCustomCommands();
        res.send('Commands stopped - ' + stoppedCommandsArray.join(', '));
        return;
    }

    if (_.isString(commandValue) || _.isObject(commandValue)) {
        commandId = executeCustomCommand.alreadyConnectedSingleValue(bb8, commandName, commandValue);
    } else if (_.isArray(commandValue)) {
        commandId = executeCustomCommand.alreadyConnectedMultipleValues(bb8, commandName, commandValue);
    } else {
        commandId = executeCustomCommand.alreadyConnectedSingleValue(bb8, commandName, {});
    }

    if (commandId) {
        runningCommandIds.push({
            commandName: commandName,
            commandValue: commandValue,
            commandRunningId: commandId
        });
    }

    res.send('Command Executed - ' + commandName);
    return;
};

module.exports = function (bb8, options) {
    expressInstance(function (req, res) {

        var requestBody = req.body;

        if (requestBody.command && requestBody.mode === 'sphero') {
            spheroCommandExecuter(bb8, req.body, res);
        } else if (requestBody.command && requestBody.mode === 'custom') {
            customCommandExecuter(bb8, req.body, res);
        } else {
            res.send('Command is invalid');
        }
    }, options);
};
