const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const path = "COM5";

const port = new SerialPort(path, {
  baudRate: 115200
});
const parser = port.pipe(new Readline());
var latestTimes = [0, 0, 0];

port.on('error', err => console.log("Couldn't open serial port"));
parser.on('data', line => {
  var timeStrings = line.split("&");
  latestTimes = timeStrings.map(x => parseFloat(x));
});

function getLatestTimes() {
  return latestTimes;
}

module.exports = {
  getLatestTimes,
}
