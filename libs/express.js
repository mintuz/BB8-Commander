var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

module.exports = function(callback, options) {

  var port = options.port || 3000;

  app.use(bodyParser.json());
  app.post('/', callback);
  app.listen(port, function () {
    console.log( 'Server listening on port ' + port );
  });
}
