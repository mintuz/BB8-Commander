module.exports = function (bb8) {

    console.log('Getting battery Info');

    bb8.getPowerState(function(error,data){
      if(error){
        console.error("Beep Boop!! Something went wrong !\n", error);
      } else {
        console.log("Raw Data:");
        //Possible power states:
        //0x01 - Battery Charging
        //0x02 - Battery OK
        //0x03 - Battery Low
        //0x04 - Battery Critical
        //console.log("RecVer:         ", data.recVer); //Useful when doing other good stuff
        console.log("Power State:      ", data.batteryState);
        console.log("Battery Volatage: ", data.batteryVoltage);
        console.log("Charge Count:     ", data.chargeCount);
        console.log("Time Since Charge:", Math.floor(data.secondsSinceCharge / 60) +" minutes");
      }
    });
};
