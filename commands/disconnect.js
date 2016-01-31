module.exports = function (bb8) {
    bb8.disconnect(function () {
        var config = require('home-config').load('.bb8config');
        console.log('Disconnected from ' + config.BB8_LOCAL_NAME);
    });
};
