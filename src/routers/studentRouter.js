const express = require("express");
const studentController = require("../controllers/studentController");
const studentRouter = express.Router();

studentRouter.get("/dashboard", studentController.getDashboard);

studentRouter
  .route("/join")
  .get(studentController.getJoinRace)
  .post(studentController.postJoinRace);
studentRouter.get("/result", studentController.getResult);

studentRouter.get("/chart", studentController.getTimes);

module.exports = studentRouter;
