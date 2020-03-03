var http = require("http");
var fs = require("fs");

var port = 80;
var readStream;
var server = http.createServer(function (req, res) {

    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url == "/index.html") {
        readStream = fs.createReadStream(__dirname + "/index.html", "utf8");
    } else if (req.url == "/hello.html") {
        readStream = fs.createReadStream(__dirname + "/hello.html", "utf8");
    }
    readStream.pipe(res);

});

server.listen(port);
console.log("Succesfully vibing on port: " + port);