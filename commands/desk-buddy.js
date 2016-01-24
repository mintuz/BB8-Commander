var _ = require('lodash');

var moveHead = function(bb8) {
  bb8.roll(0, Math.floor(Math.random() * 180));
};

module.exports = function (bb8) {
    
    console.log('Place me in my charging station');

    bb8.color('#000000');
    moveHead(bb8);

    var partiallyAppliedMoveHead = _.partial(moveHead, bb8);

    setInterval(partiallyAppliedMoveHead, 4000);
};



