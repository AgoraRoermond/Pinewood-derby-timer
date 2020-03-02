var http = require("http");
var fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var port = 80;

var page = /index.html;

const dom = new JSDOM(page);
console.log(dom.window.document.querySelector("h1").textContent);

var server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var readStream = fs.createReadStream(__dirname + "/index.html", "utf8");
    readStream.pipe(res);

});

server.listen(port);
console.log("Succesfully vibing on port: " + port);