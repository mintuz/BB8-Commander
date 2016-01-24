var bb8 = require('./bb8-instance')();

module.exports = function (command, options) {
    if (bb8) {
        bb8.connect(function () {
            require(command)(bb8, options)
        });
    }
};