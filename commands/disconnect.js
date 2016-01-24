module.exports = function (bb8) {
    bb8.disconnect(function () {
        console.log('Disconnected from ' + config.BB8_LOCAL_NAME);
    });
};
