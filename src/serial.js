const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const path = "COM3";
const port = new SerialPort(path, { baudRate: 115200 })
const parser = new Readline()

port.pipe(parser)

parser.on('data', line => chop(line));

function chop(line) {


    var line = line.replace("#", "");
    var line = line.replace("*", "");
    var string = line.split("&");
    var time1 = string[0];
    var time2 = string[1];
    var time3 = string[2];
    console.log("time1 = "+time1);
    console.log("time2 = "+time2);
    console.log("time3 = "+time3);

} 


