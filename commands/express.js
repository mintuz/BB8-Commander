var bb8 = require('../libs/bb8-instance')(),
    config = require('../libs/bb8-instance').config,,
    expressInstance = require('../libs/express');

module.exports = function() {

    if(bb8) {

        bb8.connect(function() {

            console.log('Connected to ' + config.BB8_LOCAL_NAME);

            expressInstance(function (req, res) {

                var requestBody = req.body;

                if(requestBody.action && requestBody.value) {

                    if(typeof(requestBody.value) === 'string') {
                        bb8[requestBody.action](requestBody.value);
                    } else if(typeof(requestBody.value) === 'object') {
                        bb8[requestBody.action].apply(this, requestBody.value);
                    }

                    res.send('Command received');

                } else {
                    res.send('Command is invalid');
                }
            });
        });
    }
};
