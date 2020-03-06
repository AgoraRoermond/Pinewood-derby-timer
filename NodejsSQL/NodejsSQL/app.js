var app = require('express')();
var bodyParser = require("body-parser");
var mysql = require("mysql");

var test;

var connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "AgoraRoermond",
        database: "test"
    });

connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM leerling", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        test = fields[0].toString();
        console.log(test);
    }
    )
})

var port = 80;
//var test = "hello there";

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => { res.render("index", { test: test }); });
app.get("/OwO", (req, res) => { res.render("pageA", { test: test }); });
app.get("/easteregg", (req, res) => { res.render("secret", { test: test }); });
app.get("*", (req, res) => { res.render("404", { test: test }); });
app.listen(port, () => { console.log("Succesfully vibing on port: " + port); });
