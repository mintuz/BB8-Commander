var noble = require('noble'),
    _ = require('lodash');

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

    if(_.includes(peripheral.advertisement.localName, 'BB-')) {

      var deviceUUID = peripheral.uuid;

      console.log('BB8 UUID - "' + deviceUUID + '"');
      console.log('Writing to config file');

      var config = require('home-config').load('.bb8config', {
        BB8_UUID: deviceUUID
      });

      config.save();

      console.log('Saved config file, you can now ctrl+c this task');

    } else {
      console.log("This isn't the droid you are looking for");
      console.log("UUID - " + peripheral.uuid);
      console.log("Local Name - " + peripheral.advertisement.localName);
    }

  });

};