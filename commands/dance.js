module.exports = function (bb8) {
    console.log("BB-8 got moves!!");

    var movesTimer = setInterval(function() {
        var direction = Math.floor(Math.random() * 360);
        var distance = Math.floor(Math.random() * (150 - 10)) + 10
        bb8.roll(distance, direction);
      }, 100);

    var colorTimer = setInterval(function () {
        bb8.randomColor();
    }, 250);

    //only bother bb8 for 5 seconds
    setTimeout(function() {
       clearInterval(movesTimer);
       clearInterval(colorTimer);
    }, 5000);

};
