module.exports = function (bb8,options) {
    var radius = options.radius; //mm
    var distance = 2*Math.PI*radius;
    var colors = ["red","green"];
    var angle_counter = 0;
    var direction = 30;
    return setInterval(function() {
        bb8.roll(Math.floor(distance/12),direction*angle_counter);
        bb8.color(_.sample(colors));
        angle_counter++;
        if (angle_counter>11) {
            angle_counter = 0;
        }
    }, 500);
};
