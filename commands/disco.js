module.exports = function (bb8) {
    console.log('Let\'s Party!!');

    bb8.randomColor();
    setInterval(function () {
        bb8.randomColor();
    }, 1000);
};
