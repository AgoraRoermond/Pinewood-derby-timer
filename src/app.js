const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const routes = require('./router');

const app = express();
var port = 8080;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => console.log("Succesfully vibing on port: " + port));
