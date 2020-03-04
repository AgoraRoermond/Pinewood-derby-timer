var http = require("http");
var fs = require("fs");
var express = require("express");

var port = 80;
var readStream;

var server = http.createServer(function (req, res) {

    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url == "/") {
        readStream = fs.createReadStream(__dirname + "/index.html", "utf8");
        //res.render(__dirname + "/index.html", { port: port });
    } else if (req.url == "/hello") {
        readStream = fs.createReadStream(__dirname + "/hello.html", "utf8");
        //res.render(__dirname + "/hello.html", { port: port });
    } else {
        readStream = fs.createReadStream(__dirname + "/err.html", "utf8");
        //res.render(__dirname + "/err.html", { port: port });
    }


    readStream.pipe(res);

});

server.listen(port);
console.log("Succesfully vibing on port: " + port);