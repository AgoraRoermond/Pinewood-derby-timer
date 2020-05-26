const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const path = "COM3";
const port = new SerialPort(path, { baudRate: 115200 })
const parser = new Readline()

port.pipe(parser)

parser.on('data', line => chop(line));

function chop(line) {

    var string = line.split("&");

    console.log(string[0]);
    } 

