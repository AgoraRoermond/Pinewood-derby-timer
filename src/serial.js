const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const timesController = require('controllers/timesController.js');

<<<<<<< Updated upstream
const path = "COM3";
=======
const path = "/dev/tty.usbmodem14101";
>>>>>>> Stashed changes

const port = new SerialPort(path, { baudRate: 115200 });
const parser = port.pipe(new Readline());
var latestTimes = [0, 0, 0];

port.on('error', err => console.log("Couldn't open serial port"));
parser.on('data', line => {
<<<<<<< Updated upstream
  var timeStrings = line.split("&");
  latestTimes = timeStrings.map(x => parseFloat(x));
=======
    var timeStrings = line.split("&");
    latestTimes = timeStrings.map(x => parseFloat(x));
    timesController.saveTimes(latestTimes);
    //console.log(latestTimes);
>>>>>>> Stashed changes
});

function getLatestTimes() {
    return latestTimes;
}

saveTimes(latestTimes);

module.exports = {
    getLatestTimes,
}