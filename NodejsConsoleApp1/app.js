var app = require('express')();
var bodyParser = require("body-parser"); 

var port = 8080;

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
app.use(bodyParser.urlencoded({ extended: false })); 

app.get("/", (req, res) => { res.render("index", { port: port }); }); 
app.listen(port, () => { console.log("Succesfully vibing on port: " + port); });