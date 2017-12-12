module.exports = function (bb8,options) {
 var radius = options.radius; //mm
 var distance = 2*Math.PI*radius;
 var colors = ["red","green"];
 var i = 0;
 return setInterval(function() {
    var direction = 30;
    bb8.roll(Math.floor(distance/12),direction*i);
    var chosen = (function(){
      if (Math.random() > 0.5) {
        return 1;
       } else {
        return 0;
       }
    })();
    bb8.color(colors[chosen]);
    i++;
    if (i>11) {
        i = 0;
    }
 }, 500);
};
