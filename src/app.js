const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./router");
require("./serial.js");
const session = require("express-session");
var FileStore = require("session-file-store")(session);
const app = express();
var port = process.env.NODE_ENV === "production" ? 80 : 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore({}),
  })
);
app.use("/", routes);

app.listen(port, () => console.log("Succesfully vibing on port: " + port));
