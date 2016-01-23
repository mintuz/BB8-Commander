var bb8 = require('../libs/bb8-instance')(),
    config = require('../libs/bb8-instance').config,
    expressInstance = require('../libs/express');

var callbackFactory = function(res){
    return function(err, data){
        if(!err) {
            res.send({data: data});
        } else {
            res.send({error: err});
        }
    };
};

module.exports = function() {

    if(bb8) {

        bb8.connect(function() {

            console.log('Connected to ' + config.BB8_LOCAL_NAME);

            expressInstance(function (req, res) {

                var requestBody = req.body;

                if(requestBody.action && requestBody.mode === 'sphero') {

                    if(typeof(requestBody.value) === 'string') {

                        bb8[requestBody.action](requestBody.value, callbackFactory(res));

                    } else if(typeof(requestBody.value) === 'object') {

                        requestBody.value.push(callbackFactory(res));

                        bb8[requestBody.action].apply(this, requestBody.value);

                    } else {

                        bb8[requestBody.action](callbackFactory(res));

                    }

                } else {
                    res.send('Command is invalid');
                }
            });
        });
    }
};
