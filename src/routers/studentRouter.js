const express = require('express');
const studentController = require('../controllers/studentController');
const studentRouter = express.Router();

studentRouter.get('/student', studentController.getTimes);


module.exports = studentRouter;
