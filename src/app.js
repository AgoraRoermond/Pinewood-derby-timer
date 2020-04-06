var app = require('express')();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require('path');


var student;

/*var connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "AgoraRoermond",
        database: "Derby"
    });*/


/*connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(test);
        student = result;
    }
    )
})*/

//connection.query("SELECT * FROM student"(result, fields)) => { student = result; };

var port = 8080;
var test = "hello there";

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => { res.render("404"); });
app.get("/OwO", (req, res) => { res.render("pageA", { test: test }); });
app.get("/easteregg", (req, res) => { res.render("secret", { test: test }); });
app.get("*", (req, res) => { res.render("404", { test: test }); });
app.listen(port, () => { console.log("Succesfully vibing on port: " + port); });
