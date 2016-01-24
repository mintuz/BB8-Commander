module.exports = function (bb8) {
    console.log('Let\'s Roll!!');

    setInterval(function () {
        
        var direction = Math.floor(Math.random() * 360);
        bb8.roll(150, direction);
        
    }, 1000);
};



