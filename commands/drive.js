var keypress = require('keypress');

module.exports = function (bb8) {

  //variation of the roll command to enable input from keyboard
  //useful when it you get commands from the Internet or just to play with
  //BB-8 using nodejs

  console.log('Drive mode enabled\n Press e to calibrate and tap e again to point the BB8 in the direction you want to drive and q to finish calibration\n Use w,s,a,d style control the BB8 \n Use spacebar to stop the BB8');
  console.log('Press ctrl+c to exit');

  var stdin = process.stdin;
  stdin.setEncoding('utf8');
  keypress(stdin);

  console.log("starting to listen for arrow key presses");

  stdin.on("keypress", function(ch,key) {

    bb8.color('#000000');

    if(key && key.name === 'e') {
      bb8.startCalibration();
      bb8.roll(1, 90, 2, function() {
        setTimeout(function() {
          bb8.setHeading(0, function() {
            bb8.roll(0,0,1);
          });
        }, 300);
      });
    }

    if(key && key.name === 'q') {
      bb8.finishCalibration();
    }

    if(key && key.name === 'w'){
      bb8.stop();
      bb8.roll(150, 0);
    }

    if(key && key.name === 'd'){
      bb8.stop();
      bb8.roll(150, 90);
    }

    if(key && key.name === 's'){
      bb8.stop();
      bb8.roll(150, 180);
    }

    if(key && key.name === 'a'){
      bb8.stop();
      bb8.roll(150, 270);
    }

    if(key && key.name === 'space'){
      bb8.stop();
    }
    
    if (key && key.ctrl && key.name === 'c') {
      process.stdin.pause();
      process.exit();
    }
  });

  stdin.setRawMode(true);
  stdin.resume();

  return false;
};
