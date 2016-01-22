var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

module.exports = function(callback) {

  app.use(bodyParser.json());

  app.post('/', callback);

  app.listen(3000, function () {
    console.log( 'Server listening on port 3000' );
  });

}
