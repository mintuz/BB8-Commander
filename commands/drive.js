module.exports = function (bb8) {

  //variation of the roll command to enable input from keyboard
  //useful when it you get commands from the Internet or just to play with
  //BB-8 using nodejs
  console.log('Drive mode enabled');
  console.log('Press ctrl+c to exit');

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');

  stdin.on('data', function(key){
    bb8.color('#000000');
    if (key == '\u001B\u005B\u0041') {
      //console.log('up');
      bb8.stop();
      bb8.roll(150, 0);
    }
    if (key == '\u001B\u005B\u0043') {
      //console.log('right');
      bb8.stop();
      bb8.roll(150, 90);
    }
    if (key == '\u001B\u005B\u0042') {
      //console.log('down');
      bb8.stop();
      bb8.roll(150, 180);
    }
    if (key == '\u001B\u005B\u0044') {
      //console.log('left');
      bb8.stop();
      bb8.roll(150, 270);
    }
    if (key == '\u0003') { process.exit(); }
  });

};
