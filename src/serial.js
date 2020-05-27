const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const path = "COM3";
const port = new SerialPort(path, { baudRate: 115200 })
const parser = new Readline()

port.pipe(parser)

parser.on('data', line => chop(line));

var time1;
var time2;
var time3;

function chop(line) {

    var string = line.split("&");
    time1 = parseFloat(string[0]);
    time2 = parseFloat(string[0]);
    time3 = parseFloat(string[0]);

    console.log("time1 = "+time1);
    console.log("time2 = "+time2);
    console.log("time3 = "+time3);

}


module.exports = {
    time1,
    time2,
    time3,
}