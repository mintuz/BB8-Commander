var bb8 = require('../libs/bb8-instance')(),
    config = require('../libs/bb8-instance').config,
    expressInstance = require('../libs/express'),
    executeCustomCommand = require('../libs/execute-command'),
    _ = require('lodash');

var callbackFactory = function(res){
    return function(err, data){
        if(!err) {
            res.send({data: data});
        } else {
            res.send({error: err});
        }
    };
};

var spheroCommandExecuter = function(bb8, requestBody, res) {

    if(typeof(requestBody.value) === 'string') {

        bb8[requestBody.action](requestBody.value, callbackFactory(res));

    } else if(typeof(requestBody.value) === 'object') {

        requestBody.value.push(callbackFactory(res));

        bb8[requestBody.action].apply(this, requestBody.value);

    } else {

        bb8[requestBody.action](callbackFactory(res));

    }

};

var customCommandExecuter = function(bb8, requestBody, res){

    if(_.isString(requestBody.value) || _.isObject(requestBody.value)) {
    
        executeCustomCommand.alreadyConnectedSingleValue(bb8, requestBody.action, requestBody.value);

    } else if(_.isArray(requestBody.value)) {
    
        executeCustomCommand.alreadyConnectedMultipleValues(bb8, requestBody.action, requestBody.value);
    
    } else {

        executeCustomCommand.alreadyConnected(bb8, requestBody.action);

    }

    res.send('Command Executed - ' + requestBody.action);

};

module.exports = function(bb8, options) {

    expressInstance(function (req, res) {

        var requestBody = req.body;

        if(requestBody.action && requestBody.mode === 'sphero') {

            spheroCommandExecuter(bb8, req.body, res);

        } else if(requestBody.action && requestBody.mode === 'custom') {

            customCommandExecuter(bb8, req.body, res);
            
        } else {

            res.send('Command is invalid');

        }

    }, options);
};
