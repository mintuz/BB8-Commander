var noble = require('noble');

module.exports = function() {
  
  console.log('Beginning Setup');

  noble.on('stateChange', function(state) {
    
    if (state === 'poweredOn') {
      noble.startScanning();
    } else {
      noble.stopScanning();
    }

  });

  noble.on('discover', function(peripheral){

    var deviceID = peripheral.id;

    console.log('BB8 ID - "' + deviceID + '"');
    console.log('Writing to config file');

    var config = require('home-config').load('.bb8config', {
      BB8_ID: deviceID
    });

    config.save();

    console.log('Saved config file, you can now ctrl+c this task');

  });

};