const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const path = "COM3";
const port = new SerialPort(path, { baudRate: 115200 })
const parser = new Readline()

port.pipe(parser)

parser.on('data', line => chop(line));

var latestTimes = [0,0,0];

function chop(line) {
    var timeStrings = line.split("&");
    latestTimes = timeStrings.map(x => parseFloat(x));
}

function getLatestTimes() {
    return latestTimes;
}


module.exports = {
    latestTimes,
}