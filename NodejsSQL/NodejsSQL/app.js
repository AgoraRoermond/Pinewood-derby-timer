var app = require('express')();
var bodyParser = require("body-parser");

var port = 80;
var test = "hello there";

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => { res.render("index", { test: test }); });
app.get("/pageA", (req, res) => { res.render("pageA", { test: test }); });
app.get("*", (req, res) => { res.render("404", { test: test }); });
app.listen(port, () => { console.log("Succesfully vibing on port: " + port); });
