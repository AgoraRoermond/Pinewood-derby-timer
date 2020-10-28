const express = require("express");
const studentController = require("../controllers/studentController");
const apiRouter = express.Router();

apiRouter.get("/student/result", studentController.getResultApi);

module.exports = apiRouter;
