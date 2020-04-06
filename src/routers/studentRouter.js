const express = require('express')
const studentController = require('../controllers/studentController');
const studentRouter = express.Router()

studentRouter.get('/all', studentController.getAllStudents);

module.exports = studentRouter;
