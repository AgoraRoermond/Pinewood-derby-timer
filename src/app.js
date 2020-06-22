const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const routes = require('./router');
const app = express ()
const bodyParser = require("body-parser")
require('./serial.js');

const app = express();
var port = process.env.NODE_ENV === "production" ? 80 : 8080;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.get('/',(req, res) => {res.render('index')})
app.post("/submit", (req, res) => {
  console.log("Username: "+req.body.username)
  res.redirect("/")
})
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', routes);
app.use(bodyparser.urlencoded({extended:true}))

app.listen(port, () => console.log("Succesfully vibing on port: " + port));
